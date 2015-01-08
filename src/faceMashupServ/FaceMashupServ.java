package faceMashupServ;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.joda.time.format.DateTimeFormatter;
import org.joda.time.format.ISODateTimeFormat;
import org.json.*;
import org.omg.CORBA.NameValuePair;
import org.apache.*;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.DefaultHttpClient;

import com.google.gson.Gson;




class ConnectedListElement {

	boolean processed;
	String widgetDest;
	ArrayList<String> inputElements = new ArrayList<String>();

}

class ElementSelectedForConnection {

	int widgetDest;
	boolean selected;

}

class Wf {

	String graphicalValue; 
	String defaultGraphicalValue;
	String valueId;
	String elementId; 
	String fieldID; 
	String fieldName;
	String fieldPath;
	Boolean fieldSelect; 
	String fieldGraphicalPath;
	String fieldType;

	//indica se l'elemento attuale della wfElements è selezionato o no per una determinato widgetDest
	ArrayList<ElementSelectedForConnection> selectedForConnection = new ArrayList<ElementSelectedForConnection>();  

}

class WfElements {

	ArrayList<Wf> wf = new ArrayList<Wf>();
	boolean elementSelected = true;
	boolean elementShowed = true;


}

class Op {

	Boolean confermed;
	Boolean processed;
	String opId;
	String fieldAId;
	String fieldBId;
	String subOp;
	ArrayList<Boolean> binArray = new ArrayList<Boolean>();
	ArrayList<String> inputType = new ArrayList<String>();


}

class WidgetObject {

	ArrayList<String> inputType = new ArrayList<String>();
	String type;
	ArrayList<Wf> wf = new ArrayList<Wf>();

}

class WidgetElementList {

	boolean loaded;
	int widgetId;
	WidgetObject widgetObject;
	int cursor;
	int numOfElementSelected;

	//contiene i valori ottenuti dall'open graph di facebook
	ArrayList<WfElements> wfElements = new ArrayList<WfElements>();

	//contiene le operazioni da svolgere sul widget
	ArrayList<Op> op = new ArrayList<Op>();

}


/**
 * Servlet implementation class FaceMashupServ
 */
@WebServlet("/FaceMashupServ")

public class FaceMashupServ extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final boolean DEBUG = false;
	private String access_token = null;

	private String FBUrl = "https://graph.facebook.com/v2.1/";
	private String FBUrl10 = "https://graph.facebook.com/v1.0/";

	private ArrayList<Integer> widgetElementPositionList;
	
	private static Map<String, String> id2picture = new HashMap<>();


	//restituisce il tupo di type. Es img o string o id e così via
	//viene usato per la match field 
	public String resolveTypeOfField(String type) {

		String result = "";

		switch(type) {

		case "001": return "id";
		case "002": return "text";
		case "003": return "text";
		case "004": return "url";
		case "005": return "url";
		case "006": return "text";
		case "007": return "text";
		case "008": return "listId";
		case "009": return "text"; //sarebbe id ma gli id dei luoghi dipendono dall'utente stesso! nel senso che esistono svariati id per un luogo e magari il nome è lo stesso. Quindi l'utente potrebbe non trovare una corispondenza!!!!
		case "010": return "listUrl";
		case "011": return "specialId"; //campo speciale il cui graphicalvalue è il picture dello user ma il value id è l'id dello user stesso
		case "012": return "url";
		case "013": return "text";

		}


		return "text";


	}

	//metodo che recupera la connectedList
	public ArrayList<ConnectedListElement> getConnectedList(JSONObject jsonObj) {

		ArrayList<ConnectedListElement> connectedList = new ArrayList<ConnectedListElement>();

		try {

			//contiene il numero di connessioni presenti nella lista
			int connectedListLength = jsonObj.getJSONArray("cl").length();

			for(int i = 0; i < connectedListLength; i++) {

				ConnectedListElement element = new ConnectedListElement();

				//recupero il widgetDest
				element.widgetDest = jsonObj.getJSONArray("cl").getJSONObject(i).getString("widgetDest");
				element.processed = jsonObj.getJSONArray("cl").getJSONObject(i).getBoolean("processed");

				//recupero dei widget di input
				for(int j = 0; j <  jsonObj.getJSONArray("cl").getJSONObject(i).getJSONArray("inputElements").length(); j++) {

					element.inputElements.add(jsonObj.getJSONArray("cl").getJSONObject(i).getJSONArray("inputElements").getString(j));
				}

				connectedList.add(element);
			}

			if(DEBUG) {

				getServletContext().log("stampa connected list");

				for(int i = 0; i < connectedList.size(); i++) {

					getServletContext().log("widgetDest " + connectedList.get(i).widgetDest);

					getServletContext().log("intpu list");
					for(int j = 0; j < connectedList.get(i).inputElements.size(); j++) {

						getServletContext().log(" " +connectedList.get(i).inputElements.get(j));

					}



				}


			}



			return connectedList;

		}catch(Exception e) {

			// TODO Auto-generated catch block
			e.printStackTrace();

			return null;

		}


	}


	//metodo che recupera la widgetElementList
	public ArrayList<WidgetElementList> getWidgetElementList(JSONObject jsonObj) {

		ArrayList<WidgetElementList> widgetElementList = new ArrayList<WidgetElementList>();

		widgetElementPositionList = new ArrayList<Integer>();

		try {  

			//contiene il numero di widget presenti nella lista
			int widgetElementListLength = jsonObj.getJSONArray("wl").length();

			for(int i = 0; i < widgetElementListLength; i++) {

				WidgetElementList element = new WidgetElementList();
				WidgetObject widgetObjectElement = new WidgetObject(); 
				Wf wfElement = new Wf();
				Op op = new Op();

				//recupero id del widget
				element.widgetId = jsonObj.getJSONArray("wl").getJSONObject(i).getInt("widgetId");
				element.loaded = jsonObj.getJSONArray("wl").getJSONObject(i).getBoolean("loaded");

				ArrayList<Boolean> binArray;

				//recupero la lista di op
				for(int opIndex = 0; opIndex < jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").length(); opIndex++) {

					op = new Op();
					binArray = new ArrayList<Boolean>();

					op.fieldAId = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getString("fieldAId");
					op.fieldBId = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getString("fieldBId");
					op.opId = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getString("opId");
					op.processed = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getBoolean("processed");
					op.subOp = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getString("subOp");
					op.confermed = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getBoolean("confermed");

					//si recupera il binArray
					for(int binIndex = 0; binIndex < jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getJSONArray("binArray").length(); binIndex++) {

						op.binArray.add(jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getJSONArray("binArray").getBoolean(binIndex));

					}

					//si recuper l'inputType
					for(int inputIndex = 0; inputIndex < jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getJSONArray("inputType").length(); inputIndex++) {

						op.inputType.add(jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("op").getJSONObject(opIndex).getJSONArray("inputType").getString(inputIndex));

					}

					element.op.add(op);

				}


				JSONObject wfElementJson;

				//recupero la sua wfElement se il campo è messo a loaded
				//quindi per aggiornare gli input del widget bastera' mettere il loaded a flase. La sua lista di wf viene annullata e scaricata di nuovo da zero
				//evitando quindi anche i doppioni
				if(element.loaded) {

					element.cursor =  jsonObj.getJSONArray("wl").getJSONObject(i).getInt("cursor");
					element.numOfElementSelected =  jsonObj.getJSONArray("wl").getJSONObject(i).getInt("numOfElementSelected");

					WfElements listOfWf;

					for(int j = 0; j < jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("wfElements").length(); j++ ) {

						listOfWf = new WfElements();
						listOfWf.elementSelected = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("wfElements").getJSONObject(j).getBoolean("elementSelected");
						listOfWf.elementShowed = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("wfElements").getJSONObject(j).getBoolean("elementShowed");

						for(int k = 0; k < jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("wfElements").getJSONObject(j).getJSONArray("wf").length(); k++) {

							wfElement = new Wf();
							wfElementJson = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONArray("wfElements").getJSONObject(j).getJSONArray("wf").getJSONObject(k);

							wfElement.elementId = wfElementJson.getString("elementId");
							wfElement.defaultGraphicalValue = wfElementJson.getString("defaultGraphicalValue");
							wfElement.fieldID = wfElementJson.getString("fieldID");
							wfElement.fieldName = wfElementJson.getString("fieldName");
							wfElement.fieldPath = wfElementJson.getString("fieldPath");
							wfElement.fieldSelect = wfElementJson.getBoolean("fieldSelect");
							wfElement.graphicalValue = wfElementJson.getString("graphicalValue");
							wfElement.fieldType = wfElementJson.getString("fieldType");
							wfElement.valueId = wfElementJson.getString("valueId");	
							wfElement.fieldGraphicalPath = wfElementJson.getString("fieldGraphicalPath");

							//riempiamo la selectedForConnection


							ElementSelectedForConnection esfc;
							//inseriamo i selected singoli e personalizzati dall'utente
							for(int selectedForConnectionIndex = 0; selectedForConnectionIndex < wfElementJson.getJSONArray("selectedForConnection").length(); selectedForConnectionIndex++) {

								esfc = new ElementSelectedForConnection();

								esfc.widgetDest = wfElementJson.getJSONArray("selectedForConnection").getJSONObject(selectedForConnectionIndex).getInt("widgetDest");
								esfc.selected =  wfElementJson.getJSONArray("selectedForConnection").getJSONObject(selectedForConnectionIndex).getBoolean("selected");

								wfElement.selectedForConnection.add(esfc);

							}



							listOfWf.wf.add(wfElement);

						}

						element.wfElements.add(listOfWf);

					}

				}


				//inserimento della posizione del widget della lista in widgetElementPositionList
				//controllo e riempimento con NULL degli elementi vuoti della lista (non esiste alcun widget con un ID relativo a quella posizione)
				if(element.widgetId >= widgetElementPositionList.size()) {

					for(int h = widgetElementPositionList.size(); h <= element.widgetId; h++) {

						widgetElementPositionList.add(h, null);

					}

				}
				widgetElementPositionList.add(element.widgetId, widgetElementList.size());

				JSONObject widgetObjectJSON = jsonObj.getJSONArray("wl").getJSONObject(i).getJSONObject("widgetObject");

				//recupero il widgetObject
				widgetObjectElement.type = widgetObjectJSON.getString("type");
				if(widgetObjectElement.type.equals("login widget")) {

					//viene recuperato l'access_token
					access_token = widgetObjectJSON.getJSONArray("wf").getJSONObject(1).getString("valueId");
					getServletContext().log("access_token: " + widgetObjectJSON.getJSONArray("wf").getJSONObject(1).getString("valueId"));


				}

				getServletContext().log("insertito il widget id " + element.widgetId);
				getServletContext().log("widget type " + widgetObjectElement.type);

				//recupero lista di input list
				for(int j = 0; j < widgetObjectJSON.getJSONArray("inputType").length(); j++) {

					widgetObjectElement.inputType.add(widgetObjectJSON.getJSONArray("inputType").getString(j));
				}

				//recupero wf
				for(int j = 0; j < widgetObjectJSON.getJSONArray("wf").length(); j++) {

					wfElement = new Wf();

					wfElement.elementId = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getString("elementId");
					wfElement.defaultGraphicalValue = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getString("defaultGraphicalValue");
					wfElement.fieldID = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getString("fieldID");
					wfElement.fieldName = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getString("fieldName");
					wfElement.fieldPath = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getString("fieldPath");
					wfElement.fieldSelect = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getBoolean("fieldSelect");
					wfElement.graphicalValue = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getString("graphicalValue");
					wfElement.fieldType = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getString("fieldType");
					wfElement.valueId = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getString("valueId");	
					wfElement.fieldGraphicalPath = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getString("fieldGraphicalPath");


					ElementSelectedForConnection esfc;
					//inseriamo i selected singoli e personalizzati dall'utente
					for(int selectedForConnectionIndex = 0; selectedForConnectionIndex < widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getJSONArray("selectedForConnection").length(); selectedForConnectionIndex++) {

						esfc = new ElementSelectedForConnection();

						esfc.widgetDest = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getJSONArray("selectedForConnection").getJSONObject(selectedForConnectionIndex).getInt("widgetDest");
						esfc.selected = widgetObjectJSON.getJSONArray("wf").getJSONObject(j).getJSONArray("selectedForConnection").getJSONObject(selectedForConnectionIndex).getBoolean("selected");

						wfElement.selectedForConnection.add(esfc);

					}



					widgetObjectElement.wf.add(wfElement);

				}



				element.widgetObject = widgetObjectElement;

				//aggingo l'elemento alla lista dei widget
				widgetElementList.add(element);	
			}

			if(DEBUG) {

				//stampa di test
				for(int i = 0; i < widgetElementList.size(); i++) {

					getServletContext().log("widgetID " + widgetElementList.get(i).widgetId);
					getServletContext().log("type " + widgetElementList.get(i).widgetObject.type);
					getServletContext().log(" input type list ");

					for(int j = 0; j < widgetElementList.get(i).widgetObject.inputType.size(); j++) {
						getServletContext().log(widgetElementList.get(i).widgetObject.inputType.get(j));	
					}

					for(int j = 0; j <  widgetElementList.get(i).widgetObject.wf.size(); j++) {

						getServletContext().log("element name " + widgetElementList.get(i).widgetObject.wf.get(j).fieldType);
						getServletContext().log("element name " + widgetElementList.get(i).widgetObject.wf.get(j).fieldName);

					}

				}

			}



			return widgetElementList;


		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();

			return null;
		}



	}


	//restituisce true se tutti i widget della lista di inputWidget dell'elemento della connectedList all'index connectedListIndex hanno il campo
	//loaded = true, altrimenti restituisce false
	//inoltre controlla se nelle operazioni di match il fieldB ha settato un campo proveniente da un widget loaded
	public boolean canProcessedIt(ArrayList<WidgetElementList> widgetElementList, ArrayList<ConnectedListElement> connectedList, int connectedListIndex) {

		boolean value = false;

		for(int i = 0; i < connectedList.get(connectedListIndex).inputElements.size(); i++) {

			//entro nella widgetElementPositionList per cercare la posizione del widget di input nella widgetElmentList

			int widgetElementIndex;
			
			try {
				widgetElementIndex = widgetElementPositionList.get(Integer.parseInt(connectedList.get(connectedListIndex).inputElements.get(i).split("_")[connectedList.get(connectedListIndex).inputElements.get(i).split("_").length - 1]));

			}catch(Exception e) {
				return false;
			}
			
			

			//se è uguale a false non possiamo processarlo
			if(!widgetElementList.get(widgetElementIndex).loaded) {
				return false;
			}

		}

		//i widget di input sono tutti caricati. Controlliamo se anche l'input delle operazioni lo sono

		int widgetIndex = widgetElementPositionList.get(Integer.parseInt(connectedList.get(connectedListIndex).widgetDest));

		for(int i = 0; i < widgetElementList.get(widgetIndex).op.size(); i++) {

			String opCode = widgetElementList.get(widgetIndex).op.get(i).opId.split("_")[0];

			switch(opCode) {

			case "001": //operazione di match. Il fieldB dev'essere loaded
				if(!widgetElementList.get(widgetIndex).op.get(i).fieldBId.equals("")) {

					int widgetId = Integer.parseInt(widgetElementList.get(widgetIndex).op.get(i).fieldBId.split("_")[widgetElementList.get(widgetIndex).op.get(i).fieldBId.split("_").length - 1]);

					//controlliamo se è loaded
					if(!widgetElementList.get(widgetElementPositionList.get(widgetId)).loaded) {
						return false;
					}

				}
				break;


			}

		}

		return true;

	}

	public void postDataFromUrl(URL url, String parameters) throws IOException {

		getServletContext().log("apro " + url.toString());

		HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
		connection.setRequestMethod("POST");


		connection.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
		wr.writeBytes(parameters);
		wr.flush();
		wr.close();

		int responseCode = connection.getResponseCode();

		BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		getServletContext().log("ottengo " + response.toString());


	}

	public JSONObject getResponseFromUrl(URL url) throws IOException {

		String response = "";

		getServletContext().log("apro " + url.toString());

		URLConnection yc = url.openConnection();
		BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
		String inputLine;

		while ((inputLine = in.readLine()) != null) {
			response = response + inputLine;

		}

		in.close();

		JSONObject jsonValue =  new JSONObject();

		try {
			jsonValue = new JSONObject(java.net.URLDecoder.decode(response, "UTF-8"));
		} catch (JSONException e) {

			e.printStackTrace();
		}

		return jsonValue;
	}

	//resituitsce la splittedString con i due caratteri iniziali eliminati
	public String[] getNewSplittedString(String[] splittedString) {

		String[] subSplittedString = new String[splittedString.length - 2];
		//copia array tranne i primi due elemente
		for(int i = 2; i < splittedString.length; i++) {
			subSplittedString[i-2] = splittedString[i];
		}

		return subSplittedString;

	}


	public String recursiveResolvePathCore(String result, JSONObject object, String[] splittedString) throws JSONException {

		if(splittedString.length == 0) {
			return result;
		}

		if(splittedString[0].equals("/")) {
			String[] subSplittedString = getNewSplittedString(splittedString);
			try{
				return recursiveResolvePathCore(result + "," + object.getString(splittedString[1]), object, subSplittedString);	
			}catch(Exception e) {
				//non è una stringa!!!
				return recursiveResolvePathCore(result + "," + String.valueOf(object.getDouble(splittedString[1])), object, subSplittedString);	
			}

		}

		if(splittedString[0].equals("{")) {
			String[] subSplittedString = getNewSplittedString(splittedString);
			return recursiveResolvePathCore(result , object.getJSONObject(splittedString[1]), subSplittedString);
		}

		if(splittedString[0].equals("[")) {

			JSONArray jsonArray = object.getJSONArray(splittedString[1]);
			String[] subSplittedString = getNewSplittedString(splittedString);	
			for(int i = 0; i < jsonArray.length(); i++) {

				result = recursiveResolvePathCore(result, jsonArray.getJSONObject(i), subSplittedString);

			}

			return result;
		}

		return null;

	}


	public String resolvePath(JSONObject object, String valuePath) {

		String[] splittedString = valuePath.split("-");

		try {

			return recursiveResolvePathCore("", object, splittedString).substring(1);
		} catch (JSONException e) {
			getServletContext().log("return vuoto! exception con "+valuePath);
			return "";
		}
	}



	//prende l'id di un elemento facebook e restituisce ciò che l'utente si apsetta di vedere.
	//es UserdId -> Nome utente
	//photoId -> url della foto
	public String resolveId(String valueId, String type) throws IOException {

		//getServletContext().log("resolve id su type " +type);

		URL url;
		String value = "";
		JSONObject jsonValue = new JSONObject();

		String[] monthString = {"Gennaio", "Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"};

		try {

			switch(type) {

			case "001": //restituisce il nome
				url = new URL(FBUrl + valueId +"/?access_token=" +access_token);
				jsonValue = getResponseFromUrl(url);
				value = jsonValue.getString("name");
				break;

			case "002": //resituisce la stringa stessa
				value = valueId;
				break;

			case "003":  //resituisce la stringa stessa
				value = valueId;
				break;

			case "004": 
				url = new URL(FBUrl + valueId +"/picture?access_token=" +access_token + "&redirect=false");
				jsonValue = getResponseFromUrl(url);
				value = jsonValue.getJSONObject("data").getString("url");
				
				//value = valueId;

				break;

			case "005": //restituisce l'url della foto
				url = new URL(FBUrl + valueId +"/picture?access_token=" +access_token + "&redirect=false");
				jsonValue = getResponseFromUrl(url);
				value = jsonValue.getJSONObject("data").getString("url");
				break;

			case "006": //è una data. "2013-08-07T20:13:25+0000" -> 07 agosto 2013
				//potrebbe anche essere ne formato mm/dd/yyyy quindi viene prma svolto un controllo

				if(valueId.split("/").length == 3) {

					String month = monthString[Integer.parseInt(valueId.split("/")[0]) - 1];
					String day = valueId.split("/")[1];
					String year = valueId.split("/")[2];

					value = day + " " + month + " " + year;

				}else {

					String year = valueId.split("-")[0];
					String month = monthString[Integer.parseInt(valueId.split("-")[1]) - 1];
					String day = valueId.split("-")[2].split("T")[0];

					value = day + " " + month + " " + year;

				}


				break;

			case "007": //descrizione della foto
				value = valueId;
				break;

			case "008": //lista di utenti. String in cui i vari user sono separati da una virgola
				String[] userId = valueId.split(",");
				for(int i = 0; i < userId.length; i++) {	
					value = value + resolveId(userId[i], "001") + ",";
				}
				break;

			case "009": //place
				value = resolveId(valueId, "001");
				break;
				
				
			case "011": //restituisce l'url della picture
				
				//per migliorare leprestazioni (non ha senso scaricare n volte la stessa identica immagine) memorizziamo all'interno di
				//una hashmap gli id che interroghiamo. Se l'id è già presente resituiamo direttamente i vsalore 
				//altrimenti lo inseriamo con il risultato della chiamata
				
				if(id2picture.containsKey(valueId)) {
					value = id2picture.get(valueId);
				}else{
					
					url = new URL(FBUrl + valueId +"/picture?access_token=" +access_token + "&redirect=false");
					jsonValue = getResponseFromUrl(url);
					value = jsonValue.getJSONObject("data").getString("url");
					
					id2picture.put(valueId, value);
					
				}
				
				
				
				
				//value = "";
				
				break;

			}


			return value;

		}catch(Exception e) {

			return "";

		}

	}

	public Set<String> getContentOfPostOperation(ArrayList<WidgetElementList> widgetElementList, int indexOfWidget, String giveMeThe) {

		Set<String> content = new HashSet<String>();
		int widgetId = widgetElementList.get(indexOfWidget).widgetId;

		//per ogni operazione
		for(int i = 0; i < widgetElementList.get(indexOfWidget).op.size(); i++) {

			String fieldId;

			//leggi fieldA e fieldB
			for(int j = 0; j < 2; j++) {
				if(j == 0) {
					fieldId = widgetElementList.get(indexOfWidget).op.get(i).fieldAId;
				}else {
					fieldId = widgetElementList.get(indexOfWidget).op.get(i).fieldBId;
				}

				getServletContext().log("fieldId letto" +fieldId);

				if(fieldId.equals("")) {
					return content;
				} else {
					int idOfField = Integer.parseInt(fieldId.split("_")[fieldId.split("_").length - 1]);
					int indexOfThisWidget = widgetElementPositionList.get(idOfField);

					int wfIndexOfElement = -1;
					String typeOfField = "";
					//cerco l'index del field che ha elementId uguale all'interno della wf per questo widget
					for(int wfIndex = 0; wfIndex < widgetElementList.get(indexOfThisWidget).widgetObject.wf.size(); wfIndex++) {
						if( widgetElementList.get(indexOfThisWidget).widgetObject.wf.get(wfIndex).elementId.equals(fieldId)) {
							wfIndexOfElement = wfIndex;
							typeOfField = widgetElementList.get(indexOfThisWidget).widgetObject.wf.get(wfIndex).fieldType;
							break;
						}
					}

					//per ogni wfElement se questo è selezionato globalmente ed è anche selezioanto per widgetId allora isneriamo il valueId all'interno del content
					//in base al typeOfField

					for(int wfElementIndex = 0; wfElementIndex < widgetElementList.get(indexOfThisWidget).wfElements.size(); wfElementIndex++) {

						if(widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).elementSelected) {

							boolean isSelected = false;
							//controlliamo che il field sia selezionato per questo determinato widgetId
							for(int selIndex = 0; selIndex < widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).wf.get(wfIndexOfElement).selectedForConnection.size(); selIndex++) {

								if(widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).wf.get(wfIndexOfElement).selectedForConnection.get(selIndex).widgetDest == widgetId) {
									isSelected = widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).wf.get(wfIndexOfElement).selectedForConnection.get(selIndex).selected;
									break;
								}

							}

							if(isSelected) {
								//l'elemento dev'essere inserito all'interno del content
								//sulla base del type

								switch(typeOfField) {

								case "001": 
									if(giveMeThe.equals("valueId")) {

										content.add(widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).wf.get(wfIndexOfElement).valueId);
									}else {
										content.add(widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).wf.get(wfIndexOfElement).graphicalValue);
									}

									break;

								case "008": 
									String[] valueIdSplit;
									if(giveMeThe.equals("valueId")) {

										valueIdSplit = widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).wf.get(wfIndexOfElement).valueId.split(",");
									}else {
										valueIdSplit = widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).wf.get(wfIndexOfElement).graphicalValue.split(",");
									}

									for(int valueIdSplitIndex = 0; valueIdSplitIndex < valueIdSplit.length; valueIdSplitIndex++) {

										content.add(valueIdSplit[valueIdSplitIndex]);

									}
									break;

								case "011": //viene passato un campo che ha come graphical value la foto del profilo ma come valueId l'id dello user.
									if(giveMeThe.equals("valueId")) {

										content.add(widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).wf.get(wfIndexOfElement).valueId);
									}else {
										content.add(widgetElementList.get(indexOfThisWidget).wfElements.get(wfElementIndex).wf.get(wfIndexOfElement).graphicalValue);
									}

									break;



								}



							}

						}


					}


				}


			}
		}


		return content;


	}

	public void printWfElements(ArrayList<ArrayList<Wf>> wfElements) {

		for(int i = 0; i < wfElements.size(); i++) {

			getServletContext().log("elemento index " + i);

			for(int j = 0; j < wfElements.get(i).size(); j++) {

				getServletContext().log("field " +wfElements.get(i).get(j).fieldName + "   field id value: " + wfElements.get(i).get(j).valueId + "   graphical value: " + wfElements.get(i).get(j).graphicalValue);

			}

		}

	}


	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FaceMashupServ() {
		super();
		// TODO Auto-generated constructor stub
	}


	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		getServletContext().log("metodo doGet ");
		String statusOfComputation = "code-00-x";

		//recupero widgetElementList

		String serializedWidgetElementList = (request.getParameter("wl").toString());
		ArrayList<WidgetElementList> widgetElementList = null;

		getServletContext().log("provo ad ottenere la widgetElementList ");
		try {
			widgetElementList = getWidgetElementList(new JSONObject("{ \"wl\":" + serializedWidgetElementList + "}"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		//recupero connectedList
		String serializedConnectedList = request.getParameter("cl").toString();
		ArrayList<ConnectedListElement> connectedList = null;
		getServletContext().log("provo ad ottenere la connectedList ");
		try {
			connectedList = getConnectedList(new JSONObject("{ \"cl\":" + serializedConnectedList + "}"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		//processamento dei widget.
		//verifica del prossimo widget da processare sulla base della variabile loaded della widget element list che indica
		//se quel dato widget è stato caricato.
		//Se tutti i widget di input di un determinato widgte di destinazione sono stati caricati allora quel determinato widget può essere processato

		//indice usato per scorrere la connectedList
		int index = 0;

		//indica se dutante uno scorrimento completo della lista, almeno un widget è stato processato.
		//se nessun widget viene processato allora è presente uno stallo o il collegamento non è corretto
		boolean atLeastOne = false;

		while(index < connectedList.size()) {

			getServletContext().log("esamino collegamento in posizione: " + index);

			//se il widget non è stato ancora processato ed è diverso da un widget di login
			if(connectedList.size() > 0 && !connectedList.get(index).processed && !widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).widgetObject.type.equals("login widget")) {

				//controllo sulla lista dei widget di input
				if (canProcessedIt(widgetElementList, connectedList, index)) {

					getServletContext().log("posso processare il widgetID:" + connectedList.get(index).widgetDest);
					getServletContext().log("scarico informazioni da facebook!");

					//serve per evitare di fare chiamate multiple con lo stesso valueId ai server di facebook
					Set<String> valueIdSet = new HashSet<String>(); 
					Set<String> contentOfOpForPost = new HashSet<String>(); //contiene tutti i valori delle op che servono per i widget di POST. Questi vengono in questo modo calcolati solo una volta per tutta l'operazione di POST

					atLeastOne = true;

					//processamento del widgetDest presente nella connctedList in posizione index
					//################################################################################################
					//################################################################################################
					//################################################################################################
					//################################################################################################
					//################################################################################################
					//################################################################################################

					int widgetDestIndex = widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest));

					//scorro i suoi input
					for(int inputWidgetI = 0; inputWidgetI < connectedList.get(index).inputElements.size(); inputWidgetI++) {

						//si recupera la posizione del widget di input
						int inputElementPosition = widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).inputElements.get(inputWidgetI).split("_")[connectedList.get(index).inputElements.get(inputWidgetI).split("_").length - 1]));

						//poer ogni elemento all'interno di wfElements dobbiamo recuperare i campi che hanno il fieldId selezionato 
						//effettuare la chiamata all'open graph di facebook sui quei campi
						for(int wfElementIndex = 0; wfElementIndex < widgetElementList.get(inputElementPosition).wfElements.size(); wfElementIndex++){

							//controlliamo se il campo è selezionato
							if(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).elementSelected) {


								boolean isSelected = true;


								if(isSelected) {

									//scorriamo i campi interni al wfElements dei widget di input. Questi saranno ad esempio id di utenti

									//per ogni elemento scorro la sua wf
									for(int wfFieldIndex = 0; wfFieldIndex < widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.size(); wfFieldIndex++) {

										//viene controllato se l'id del campo è identico a quello passato come input
										if(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).elementId.equals(connectedList.get(index).inputElements.get(inputWidgetI))) {

											boolean canUseIt = false;
											boolean isSelectedForThis = false;
											boolean exist = false;

											getServletContext().log("field trovato");

											//controlliamo se questa wfElement per questo determinato input è selezionata per questo determinato widgetDest
											//questo perchè in fase di modifica delel connessioni l'utente può eliminare singoli elementi dalla lista di passaggio
											//e questo non deve incidere sugli altri collegamenti. Quindi non si può modificare il selected globale

											if(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).selectedForConnection.size() > 0) {
												for(int selectedIndex = 0; selectedIndex < widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).selectedForConnection.size(); selectedIndex++) {

													//controlliamo se per quel determinato widget di destinazione il campo è selezionato
													if(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).selectedForConnection.get(selectedIndex).widgetDest == widgetElementList.get(widgetDestIndex).widgetId) { 

														isSelectedForThis = widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).selectedForConnection.get(selectedIndex).selected;
														exist = true;
													}

												}	
											}

											if(!exist) {

												getServletContext().log("////////////////////////////////////////////////////////////////////////////////77SISTEMIAMO");
												//i dati presenti all'interno della widgetElementList non sono coerenti
												//capita quando una modifica da parte dell'utente porta ad ottenere una wfElements di zero elementi
												//ma che cmq è stata precedentemente collegata. I suoi selectedElement pertanto non esisteranno per questo collegamento
												//devono quindi essere creati e messi tutti a true

												//per ogni wf
												for(int wfElementI = 0; wfElementI < widgetElementList.get(inputElementPosition).wfElements.size(); wfElementI++) {

													//creiamo ilin wfFieldIndex l'elemento di connessione
													ElementSelectedForConnection elem = new ElementSelectedForConnection();
													elem.selected = true;
													elem.widgetDest = widgetElementList.get(widgetDestIndex).widgetId;

													widgetElementList.get(inputElementPosition).wfElements.get(wfElementI).wf.get(wfFieldIndex).selectedForConnection.add(elem);
													getServletContext().log("elemento "+ widgetElementList.get(inputElementPosition).wfElements.get(wfElementI).wf.get(wfFieldIndex).elementId +" è selezionato per il widget " +elem.widgetDest);

												}

												isSelectedForThis = true;


											}



											JSONArray jsonDataArray = null;

											//sara' un arraylist
											//JSONObject jsonValue = null;
											ArrayList<JSONObject> jsonValues = new ArrayList<JSONObject>();

											String valueId = widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).valueId;

											String graphicalValue = widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).graphicalValue;

											if(!valueIdSet.contains(valueId) && !valueId.equals("") && isSelectedForThis) {

												canUseIt = true;
												
												//controllo che il valueId o il graphicalValue, nel caso di una lista, non sia uguale, se splittato, ad un unico elemento!
												//se lo è allora non lo inseriamo in quanto se ne occuperà il widget
												if(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).fieldType.equals("008")) {
													
													if(valueId.split(",").length > 1) {
														valueIdSet.add(valueId);

													}
													
												}else {
													valueIdSet.add(valueId);

												}
												
												


											}

											if(canUseIt && !valueId.equals("") && isSelectedForThis) {
												//il campo può essere usato come input
												//########################################################################################################################
												//CONTROLLO SUL WIDGET ##################################################################################################


												getServletContext().log("inziio a processarlo");

												switch(widgetElementList.get(widgetDestIndex).widgetObject.type) {

												case "photos widget": //il widget photos accetta un singolo id di un utente, una lista di id di utenti, l'id di una photo del profilo 011
													//nei primi due casi quindi dobbiamo eseguire una chiamata all'open grapg del tipo /userId/photos
													//mentre nell'ultimo dobbiamo prima recuperare il from/id dalla foto del profilo 

													switch(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).fieldType) {

													case "001": 

														URL url = new URL(FBUrl + valueId +"/photos/uploaded?access_token=" +access_token+ ",&fields=name,source,from,id,created_time,name_tags,tags,place,likes,picture&limit=25");

														jsonValues.add(getResponseFromUrl(url));

//														url = new URL(FBUrl + valueId +"/photos/tagged?access_token=" +access_token+ ",&fields=name,source,from,id,created_time,name_tags,tags,place,likes,picture&limit=25");
//
//														jsonValues.add(getResponseFromUrl(url));

														break;

													case "008": 
														//dentro valueId sono presenti una serie di id utente separati da una ",".
														String[] valueIdSplit = valueId.split(",");
														for(int valueIdSplitIndex = 0; valueIdSplitIndex < valueIdSplit.length; valueIdSplitIndex++) {

															if(!valueIdSet.contains(valueIdSplit[valueIdSplitIndex])) {
																valueIdSet.add(valueIdSplit[valueIdSplitIndex]);

																URL urlSingleElement = new URL(FBUrl + valueIdSplit[valueIdSplitIndex] +"/photos/uploaded?access_token=" +access_token+ ",&fields=name,source,from,id,created_time,name_tags,tags,place,likes,picture&limit=25");
																jsonValues.add(getResponseFromUrl(urlSingleElement));

//																urlSingleElement = new URL(FBUrl + valueIdSplit[valueIdSplitIndex] +"/photos/tagged?access_token=" +access_token+ ",&fields=name,source,from,id,created_time,name_tags,tags,place,likes,picture&limit=25");
//																jsonValues.add(getResponseFromUrl(urlSingleElement));

															}

														}
														break;

													case "011": //viene passato un campo che ha come graphical value la foto del profilo ma come valueId l'id dello user.
														URL urlForUser = new URL(FBUrl + valueId +"/photos/uploaded?access_token=" +access_token+ ",&fields=name,source,from,id,created_time,name_tags,tags,place,likes,picture&limit=25");

														jsonValues.add(getResponseFromUrl(urlForUser));

//														urlForUser = new URL(FBUrl + valueId +"/photos/tagged?access_token=" +access_token+ ",&fields=name,source,from,id,created_time,name_tags,tags,place,likes,picture&limit=25");
//
//														jsonValues.add(getResponseFromUrl(urlForUser));

														break;



													}


													break;


												case "videos widget": //il widget videos accetta un singolo id di un utente, una lista di id di utenti, l'id di una photo del profilo 011
													//nei primi due casi quindi dobbiamo eseguire una chiamata all'open grapg del tipo /userId/videos
													//mentre nell'ultimo dobbiamo prima recuperare il from/id dalla foto del profilo 

													switch(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).fieldType) {

													case "001": 

														URL url = new URL(FBUrl + valueId +"/videos/uploaded?access_token=" +access_token+ ",&fields=likes,description,from,name,source,picture,tags,created_time,id&limit=25");

														jsonValues.add(getResponseFromUrl(url));

														url = new URL(FBUrl + valueId +"/videos/tagged?access_token=" +access_token+ ",&fields=likes,description,from,name,source,picture,tags,created_time,id&limit=25");

														jsonValues.add(getResponseFromUrl(url));

														break;

													case "008": 
														//dentro valueId sono presenti una serie di id utente separati da una ",".
														String[] valueIdSplit = valueId.split(",");
														for(int valueIdSplitIndex = 0; valueIdSplitIndex < valueIdSplit.length; valueIdSplitIndex++) {

															if(!valueIdSet.contains(valueIdSplit[valueIdSplitIndex])) {
																valueIdSet.add(valueIdSplit[valueIdSplitIndex]);

																URL urlSingleElement = new URL(FBUrl + valueIdSplit[valueIdSplitIndex] +"/videos/uploaded?access_token=" +access_token+ "&fields=likes,description,from,name,source,picture,tags,created_time,id&limit=25");
																jsonValues.add(getResponseFromUrl(urlSingleElement));

																urlSingleElement = new URL(FBUrl + valueIdSplit[valueIdSplitIndex] +"/videos/tagged?access_token=" +access_token+ ",&fields=likes,description,from,name,source,picture,tags,created_time,id&limit=25");
																jsonValues.add(getResponseFromUrl(urlSingleElement));

															}

														}
														break;

													case "011": //viene passato un campo che ha come graphical value la foto del profilo ma come valueId l'id dello user.
														URL urlForUser = new URL(FBUrl + valueId +"/videos/uploaded?access_token=" +access_token+ ",&fields=likes,description,from,name,source,picture,tags,created_time,id&limit=25");

														jsonValues.add(getResponseFromUrl(urlForUser));

														urlForUser = new URL(FBUrl + valueId +"/videos/tagged?access_token=" +access_token+ ",&fields=likes,description,from,name,source,picture,tags,created_time,id&limit=25");

														jsonValues.add(getResponseFromUrl(urlForUser));

														break;



													}


													break;
													
													
												case "posts widget": //il widget postos accetta un singolo id di un utente, una lista di id di utenti, l'id di una photo del profilo 011
													//nei primi due casi quindi dobbiamo eseguire una chiamata all'open grapg del tipo /userId/photos
													//mentre nell'ultimo dobbiamo prima recuperare il from/id dalla foto del profilo 

													switch(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).fieldType) {

													case "001": 

														URL url = new URL(FBUrl + valueId +"/statuses?access_token=" +access_token+ ",&limit=25");

														jsonValues.add(getResponseFromUrl(url));


														break;

													case "008": 
														//dentro valueId sono presenti una serie di id utente separati da una ",".
														String[] valueIdSplit = valueId.split(",");
														for(int valueIdSplitIndex = 0; valueIdSplitIndex < valueIdSplit.length; valueIdSplitIndex++) {

															if(!valueIdSet.contains(valueIdSplit[valueIdSplitIndex])) {
																valueIdSet.add(valueIdSplit[valueIdSplitIndex]);

																URL urlSingleElement = new URL(FBUrl + valueIdSplit[valueIdSplitIndex] +"/statuses?access_token=" +access_token+ ",&limit=25");
																jsonValues.add(getResponseFromUrl(urlSingleElement));

															}

														}
														break;

													case "011": //viene passato un campo che ha come graphical value la foto del profilo ma come valueId l'id dello user.
														URL urlForUser = new URL(FBUrl + valueId +"/statuses?access_token=" +access_token+ ",&limit=25");

														jsonValues.add(getResponseFromUrl(urlForUser));

														break;



													}


													break;

												case "text widget": //bisogna aggiungere il graphical value di widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex) al graphical value del widget esaminato
													//creo un nuovo wfElement
													WfElements wfSingleElement = new WfElements();

													//copia valori del wf di destinazione
													for(int wfSingleElementIndex = 0; wfSingleElementIndex < widgetElementList.get(widgetDestIndex).widgetObject.wf.size(); wfSingleElementIndex++) {
														Wf wf = new Wf();
														wf.elementId = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).elementId;
														wf.defaultGraphicalValue = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).defaultGraphicalValue;
														wf.fieldID = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldID;
														wf.fieldName = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldName;
														wf.fieldPath = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldPath;
														wf.fieldSelect = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldSelect;
														wf.fieldType = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldType;

														//si recupera sempre il primo elemento (quello che viene modificato dall'utente) e si copia 

														wf.valueId = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).valueId;

														wf.graphicalValue = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).valueId + " " + graphicalValue;  

														wf.fieldGraphicalPath = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldGraphicalPath;
														wfSingleElement.wf.add(wf);

													}

													widgetElementList.get(widgetDestIndex).wfElements.add(wfSingleElement);	
													wfSingleElement = null;
													break;

												case "POST tagger widget":

													if(widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).op.get(0).confermed && !widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).op.get(0).processed) {

														//recupero l'insieme degli id degli utenti da taggare dai campi delle operation
														if(contentOfOpForPost.size() == 0) {
															//dobbiamo esaminare tutti i field delle oeprazioni del widget, prelevare i wfElement per quel field selezionati globalmente
															//e specificatamente per questo widget e quindi inserirli in contentOfOpForPost
															contentOfOpForPost = getContentOfPostOperation(widgetElementList, widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest)), "valueId");

														}

														Iterator<String> iterator = contentOfOpForPost.iterator(); 
														while (iterator.hasNext()){
															//getServletContext().log(FBUrl + valueId +"/tags/"+iterator.next()+"?access_token=" +access_token);
															//URL urlForUser = new URL(FBUrl + valueId +"/tags/"+iterator.next());
															//URL url = new URL(FBUrl + valueId +"/tags/"+iterator.next()+"?access_token=" +access_token);
															//getServletContext().log("iterator" + iterator.next());
															URL url = new URL(FBUrl + valueId +"/tags/"+iterator.next());

															postDataFromUrl(url, "access_token="+access_token);


														}

													}

													break;

												case "place widget": 
													URL url = null;
													switch(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).fieldType) {

													case "009": 

														if(!valueId.replace(" ", "").equals("")) {
															
															url = new URL(FBUrl + valueId+"?access_token=" +access_token);

															jsonValues.add(getResponseFromUrl(url));
															
														}
														

														break;

													case "007": 

                                                        if(!valueId.replace(" ", "").equals("")) {
															
                                                        	url = new URL(FBUrl + "search?q="+valueId+"&type=place&access_token=" +access_token+ ",&limit=25");

    														jsonValues.add(getResponseFromUrl(url));
															
														}
														
														

														break;

													}


												case "profile widget":

													switch(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).fieldType) {

													case "001": 

														url = new URL(FBUrl + valueId +"?access_token=" +access_token+"&locale=it_IT");
														jsonValues.add(getResponseFromUrl(url));

														break;

													case "008": 
														//dentro valueId sono presenti una serie di id utente separati da una ",".
														String[] valueIdSplit = valueId.split(",");
														
														for(int valueIdSplitIndex = 0; valueIdSplitIndex < valueIdSplit.length; valueIdSplitIndex++) {
															
															
															if(!valueIdSet.contains(valueIdSplit[valueIdSplitIndex])) {
																
																
																
																valueIdSet.add(valueIdSplit[valueIdSplitIndex]);

																URL urlSingleElement = new URL(FBUrl + valueIdSplit[valueIdSplitIndex] +"?access_token=" +access_token+"&locale=it_IT");
																jsonValues.add(getResponseFromUrl(urlSingleElement));


															}

														}
														break;

													case "011": //viene passato un campo che ha come graphical value la foto del profilo ma come valueId l'id dello user.
														URL urlForUser = new URL(FBUrl + valueId +"?access_token=" +access_token+"&locale=it_IT");

														jsonValues.add(getResponseFromUrl(urlForUser));


														break;



													}


													break;
													
												case "LIST friends widget":

													switch(widgetElementList.get(inputElementPosition).wfElements.get(wfElementIndex).wf.get(wfFieldIndex).fieldType) {

													case "001": 

														url = new URL(FBUrl + valueId +"/friends?access_token=" +access_token);
														jsonValues.add(getResponseFromUrl(url));

														break;

													case "008": 
														//dentro valueId sono presenti una serie di id utente separati da una ",".
														String[] valueIdSplit = valueId.split(",");
														for(int valueIdSplitIndex = 0; valueIdSplitIndex < valueIdSplit.length; valueIdSplitIndex++) {

															if(!valueIdSet.contains(valueIdSplit[valueIdSplitIndex])) {
																valueIdSet.add(valueIdSplit[valueIdSplitIndex]);

																URL urlSingleElement = new URL(FBUrl + valueIdSplit[valueIdSplitIndex] +"/friends?access_token=" +access_token+"&locale=it");
																jsonValues.add(getResponseFromUrl(urlSingleElement));


															}

														}
														break;

													case "011": //viene passato un campo che ha come graphical value la foto del profilo ma come valueId l'id dello user.
														URL urlForUser = new URL(FBUrl + valueId +"/friends?access_token=" +access_token);

														jsonValues.add(getResponseFromUrl(urlForUser));


														break;



													}

													break;


												}//switch principale

												//for ogni elemento dell'array jsonValue per implementare, ad esempio, la possibilità di recuperare oggetti multipli

												for(int jsonValuesIndex = 0; jsonValuesIndex < jsonValues.size(); jsonValuesIndex++) {

													try {
														jsonDataArray = jsonValues.get(jsonValuesIndex).getJSONArray("data");
														//getServletContext().log("id della rpiam foto:" + jsonValue.getJSONArray("data").getJSONObject(1).getJSONObject("from").getString("name"));

														//getServletContext().log(jsonValues.toString());

													} catch (JSONException e) {
														//la risposta non è un'array!!!! data non è di fatto contenuto!!!
														//per ovviare a ciò costruaimo noi un array di un unico elemento

														try {
															JSONObject job = new JSONObject("{\"data\":["+jsonValues.get(jsonValuesIndex).toString() +"]}");
															jsonDataArray = job.getJSONArray("data");
															//getServletContext().log(job.toString());
														} catch (JSONException e1) {

															e1.printStackTrace();
														}

													}

													//ciclo sul jsonArrayData per recuperare tutti gli elementi trovati
													for(int jsonDataArrayIndex = 0; jsonDataArrayIndex < jsonDataArray.length(); jsonDataArrayIndex++) {

														//ciclo sugli elementi field presenti nel wf del widget di destinazione
														//quindi creo un wfElement uguale al wf del widget

														WfElements wfSingleElement = new WfElements();
														//copia valori del wf di destinazione
														for(int wfSingleElementIndex = 0; wfSingleElementIndex < widgetElementList.get(widgetDestIndex).widgetObject.wf.size(); wfSingleElementIndex++) {
															Wf wf = new Wf();
															wf.elementId = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).elementId;
															wf.defaultGraphicalValue = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).defaultGraphicalValue;
															wf.fieldID = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldID;
															wf.fieldName = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldName;
															wf.fieldPath = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldPath;
															wf.fieldSelect = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldSelect;
															wf.fieldType = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldType;
															wf.graphicalValue = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).graphicalValue;
															wf.valueId = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).valueId;
															wf.fieldGraphicalPath = widgetElementList.get(widgetDestIndex).widgetObject.wf.get(wfSingleElementIndex).fieldGraphicalPath;

															wfSingleElement.wf.add(wf);

														}



														//ciclo su tutti gli elementi
														for(int singleWfElementIndex = 0; singleWfElementIndex < wfSingleElement.wf.size(); singleWfElementIndex++) {

															String valuePath = wfSingleElement.wf.get(singleWfElementIndex).fieldPath;
															if(valuePath.length() != 0) {

																try {
																	wfSingleElement.wf.get(singleWfElementIndex).valueId = resolvePath(jsonDataArray.getJSONObject(jsonDataArrayIndex), valuePath);

																} catch (JSONException e) {

																	e.printStackTrace();
																}

																//viene ricavato il graphical value se il path fieldGraphicalValue == ''
																if(wfSingleElement.wf.get(singleWfElementIndex).fieldGraphicalPath.equals("")) {
																	wfSingleElement.wf.get(singleWfElementIndex).graphicalValue = resolveId(wfSingleElement.wf.get(singleWfElementIndex).valueId, wfSingleElement.wf.get(singleWfElementIndex).fieldType);

																} else {
																	//lo si recupera dall'ggetto json

																	try {
																		wfSingleElement.wf.get(singleWfElementIndex).graphicalValue = resolvePath(jsonDataArray.getJSONObject(jsonDataArrayIndex), wfSingleElement.wf.get(singleWfElementIndex).fieldGraphicalPath);

																	} catch (JSONException e) {

																		e.printStackTrace();
																	}


																}
																
																//se il type è di tipo text viene modificato andando a modificare i caratteri spciali
																if(!resolveTypeOfField(wfSingleElement.wf.get(singleWfElementIndex).fieldType).equals("url") && !resolveTypeOfField(wfSingleElement.wf.get(singleWfElementIndex).fieldType).equals("listUrl")) {
																	
																	wfSingleElement.wf.get(singleWfElementIndex).graphicalValue = replaceString(wfSingleElement.wf.get(singleWfElementIndex).graphicalValue);
																	
																}


															}

														}

														//inserisco il wifSingleElements nella widgetList
														widgetElementList.get(widgetDestIndex).wfElements.add(wfSingleElement);
														wfSingleElement = null;


													}

												}




											}



										} //if campo selezionato

									}

								}//for sui campi interni del wf elements del widget di input

							}

						}

					}

					//appena carico i dati il loaded del widget viene messo a true
					widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).loaded = true;
					connectedList.get(index).processed = true;
					widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).cursor =  0;
					widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).numOfElementSelected =  widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).wfElements.size();

					//insoltre se il widget era di POST allora anche l'operazione viene messa a processed
					if(widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).widgetObject.type.contains("POST") && widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).op.get(0).confermed) {
						widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest))).op.get(0).processed = true;
					}


				} //if canProcessed

			} //if collegamento non processato


			//esecuzione operazioni automatiche presenti nella lsita di op
			//controllo loaded = true e operazione non anocra processata
			//su widgetElementList.get(widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest)))

			int widgetIndex = widgetElementPositionList.get(Integer.parseInt(connectedList.get(index).widgetDest));


			if(widgetElementList.get(widgetIndex).loaded) {

				//controllo se è presente almento un elemento sulla wfElements
				if(widgetElementList.get(widgetIndex).wfElements.size() > 0) {


					//posso eseguire le operazioni
					for(int opIndex = 0; opIndex < widgetElementList.get(widgetIndex).op.size(); opIndex++) {
						
						//controllo che l'operazione non sia già stata eseguita e che la precedente operazione lo sia e che l'attuale sia confermata
						if((widgetElementList.get(widgetIndex).op.get(opIndex).confermed || widgetElementList.get(widgetIndex).op.get(opIndex).opId.contains("000_")) && (!widgetElementList.get(widgetIndex).op.get(opIndex).processed && opIndex == 0) || (!widgetElementList.get(widgetIndex).op.get(opIndex).processed && opIndex > 0 && widgetElementList.get(widgetIndex).op.get(opIndex - 1).processed)) {

							//controllo la dimensione della wfElements. LA dimensione del binArray dev'essere identico a quella
							//della wfElements. Se l'utente modifica la wfElements potrei avere un binArray con una dimensione minore o maggiore.
							//Pertanto qui vengono aggiunti o tolti gli elementi dal binArray in modo da far coincidere
							//le dimensioni
							if(widgetElementList.get(widgetIndex).wfElements.size() != widgetElementList.get(widgetIndex).op.get(opIndex).binArray.size()) {
								//la dimensione è diversa!!!
								if(widgetElementList.get(widgetIndex).wfElements.size() > widgetElementList.get(widgetIndex).op.get(opIndex).binArray.size()) {
									//sono stati aggiunti degli elementi
									for(int i = widgetElementList.get(widgetIndex).op.get(opIndex).binArray.size(); i < widgetElementList.get(widgetIndex).wfElements.size(); i++) {
										widgetElementList.get(widgetIndex).op.get(opIndex).binArray.add(true);
									}

								}else {
									//sono stati tolti degli elementi
									for(int i = widgetElementList.get(widgetIndex).op.get(opIndex).binArray.size()-1; i > widgetElementList.get(widgetIndex).wfElements.size(); i--) {
										widgetElementList.get(widgetIndex).op.get(opIndex).binArray.remove(i);
									}

								}


							}

							//all'interno di binArray carico, se opIndex != 0, il binArray dell'operazione precedente
							//in quanto andrò a effettuare le operazioni solo sugli elementi che mi restituisce la computazione precedente
							if(opIndex > 0) {

								//copia della binArray
								for(int binIndex = 0; binIndex < widgetElementList.get(widgetIndex).op.get(opIndex).binArray.size(); binIndex++) {

									widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(binIndex, widgetElementList.get(widgetIndex).op.get(opIndex - 1).binArray.get(binIndex));
								}

							} else {
								//prima operazione. Potrebbe essere una modifica. Sistemare il bin array tutto a true
								widgetElementList.get(widgetIndex).numOfElementSelected = widgetElementList.get(widgetIndex).wfElements.size();
								for(int binIndex = 0; binIndex < widgetElementList.get(widgetIndex).op.get(opIndex).binArray.size(); binIndex++) {
									widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(binIndex, true);
									
									try{
										widgetElementList.get(widgetIndex).wfElements.get(binIndex).elementSelected = true;
										widgetElementList.get(widgetIndex).wfElements.get(binIndex).elementShowed = true;
									}catch(Exception e) {
										getServletContext().log("Elementi nel bin array forse superiori ai wfELements!!!!!!!");
									}
									
									
								}
							}



							//controllo il codice dell'operazione
							String opCode = widgetElementList.get(widgetIndex).op.get(opIndex).opId.split("_")[0];
							switch(opCode) {

							case "000": //operazione di user select. Si interrompe l'attuale computazione restituendo 
								//le liste aggiornate all'utente iin modo tale che possa operare l'operazione sui dati.
								//soltanto se non è confermed
								
								if(!widgetElementList.get(widgetIndex).op.get(opIndex).confermed && statusOfComputation.split("-")[2].equals("x")) {
									getServletContext().log("computazione terminata. Richiesta interazione con l'utente ancora!!!!!!!!!!!");

//									Gson gson = new Gson();
//									String widgetElementListJson = gson.toJson(widgetElementList);
//									String connectedListJson = gson.toJson(connectedList);
									statusOfComputation = "code-01-"+ widgetElementList.get(widgetIndex).widgetId;


									//definizione del response
//									response.setContentType("text/javascript");
//
//									response.setCharacterEncoding("UTF-8");
//									response.getWriter().write("[" + widgetElementListJson + " , " + connectedListJson + " , " + statusOfComputation + "]");
//									return;	
								}
								break;

								

							case "001": //operazione di match field
								//recupero fieldBId

								getServletContext().log("operazione di match o di contains");

								String fieldAString = widgetElementList.get(widgetIndex).op.get(opIndex).fieldAId;
								String fieldBString = widgetElementList.get(widgetIndex).op.get(opIndex).fieldBId;

								if(!fieldAString.equals("") && !fieldBString.equals("")) {

									WfElements fieldB = new WfElements();

									String widgtetOfFieldB = widgetElementList.get(widgetIndex).op.get(opIndex).fieldBId.split("_")[widgetElementList.get(widgetIndex).op.get(opIndex).fieldBId.split("_").length - 1];

									//Si cerca il campo dentro il widget vero è proprio. Questo è oaded per forza altrimenti non dovrei neanche poter processare 
									//il collegamento.
									int widgetOfFiedlBIndex = widgetElementPositionList.get(Integer.parseInt(widgtetOfFieldB));
									String typeOfFieldB = "";
									String typeOfFieldA = "";
									int wfIndex = 0;
									int wfIndexFieldA = 0;

									//si recupera la posizione del field nella wf list
									for(int wfI = 0; wfI < widgetElementList.get(widgetOfFiedlBIndex).widgetObject.wf.size(); wfI++) {

										if(widgetElementList.get(widgetOfFiedlBIndex).widgetObject.wf.get(wfI).elementId.equals(fieldBString)) {
											//element trovato in posizione wfi
											wfIndex = wfI;
											typeOfFieldB = widgetElementList.get(widgetOfFiedlBIndex).widgetObject.wf.get(wfI).fieldType;
											break;
										}


									}

									//si recupera la posizione del fieldAId

									String elementIdOfFieldA = fieldAString;

									//si cerca l'index del fieldA
									for(int wfI = 0; wfI < widgetElementList.get(widgetIndex).widgetObject.wf.size(); wfI++) {

										getServletContext().log("Index " + wfI +" size " + widgetElementList.get(widgetIndex).widgetObject.wf.size());

										if(widgetElementList.get(widgetIndex).widgetObject.wf.get(wfI).elementId.equals(elementIdOfFieldA)) {
											//element trovato in posizione wfi
											wfIndexFieldA = wfI;
											typeOfFieldA = widgetElementList.get(widgetIndex).widgetObject.wf.get(wfI).fieldType;
											break;
										}


									}

									//si inseriscono in fieldB tutti i campi selected all'interno della wfElements
									for(int wfElementsIndex = 0; wfElementsIndex < widgetElementList.get(widgetOfFiedlBIndex).wfElements.size(); wfElementsIndex++) {

										if(widgetElementList.get(widgetOfFiedlBIndex).wfElements.get(wfElementsIndex).elementSelected) {
											fieldB.wf.add(widgetElementList.get(widgetOfFiedlBIndex).wfElements.get(wfElementsIndex).wf.get(wfIndex));	
										}
									}

									
									if(fieldB.wf.size() == 0) {
										//non c'è nulla dentro. QUindi il binArray sarà tutto a 0
										for(int binIndex = 0; binIndex < widgetElementList.get(widgetIndex).op.get(opIndex).binArray.size(); binIndex++) {
											
											widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(binIndex, false);
											
										}
										
										
									}

									//si effettua il matching sugli elementi il cui binArray è settato a true, e lo si modifica sulla base
									//dell'esito dell'operazione e si modifica anche il valore di showed e select

									//quindi si cicla sulla wfElements del widget
									for(int wfElementIndex = 0; wfElementIndex < widgetElementList.get(widgetIndex).wfElements.size(); wfElementIndex++) {

										if(widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementShowed && widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementSelected) {

											Boolean equalValue;
											if(widgetElementList.get(widgetIndex).op.get(opIndex).subOp.equals("notEqualMatchOp") || widgetElementList.get(widgetIndex).op.get(opIndex).subOp.equals("notContainsMatchOp")) {
												equalValue = false;

											}else {
												equalValue = true;
											}



											//controllo sul type
											String valueA="";
											//String valueB="";
											ArrayList<String> valueB = new ArrayList<String>();
											Boolean isNotAList = true;

											if(resolveTypeOfField(typeOfFieldA).equals("id")) {
												//confronto basato su il valueId
												//se anche il type di B è un un id allora procedo
												if(resolveTypeOfField(typeOfFieldB).equals("id")) {
													//il confronto avviene tramite il valueId

													valueA = widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).wf.get(wfIndexFieldA).valueId;
													for(int wfI = 0; wfI < fieldB.wf.size(); wfI++) {
														valueB.add(fieldB.wf.get(wfI).valueId);
													}
													//valueB = fieldB.wf.get(0).valueId;
												}else {
													//il confronto avviene tramite il graphical value
													valueA = widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).wf.get(wfIndexFieldA).graphicalValue;
													for(int wfI = 0; wfI < fieldB.wf.size(); wfI++) {
														valueB.add(fieldB.wf.get(wfI).graphicalValue);
													}
													//valueB = fieldB.wf.get(0).graphicalValue;
												}

											} else {
												if(resolveTypeOfField(typeOfFieldA).equals("text") || resolveTypeOfField(typeOfFieldA).equals("url")) {
													//il confronto avviene tramite il graphical value
													valueA = widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).wf.get(wfIndexFieldA).graphicalValue;

													for(int wfI = 0; wfI < fieldB.wf.size(); wfI++) {
														valueB.add(fieldB.wf.get(wfI).graphicalValue);
													}

													//valueB = fieldB.wf.get(0).graphicalValue;
												}else {

													if(resolveTypeOfField(typeOfFieldA).equals("listId")) {
														isNotAList = false;
														Set<String> fieldASet = new HashSet<String>();
														Set<String> fieldBSet = new HashSet<String>();

														ArrayList<Set<String>> arrayOfFieldBSet = new ArrayList<Set<String>>();

														//bisogna crearne l'insieme per poi poterne effettuare il confronto
														//se il fieldB è un text allora il confronto viene fatto sui graphicalValue
														if(resolveTypeOfField(typeOfFieldB).equals("text")) {
															getServletContext().log("Lista a di id e lista b di text");

															String fieldASplittedString[] = widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).wf.get(wfIndexFieldA).graphicalValue.split(",");
															//inserimento elementi in fieldASet
															for(int splittedIndex = 0; splittedIndex < fieldASplittedString.length; splittedIndex++) {
																fieldASet.add(fieldASplittedString[splittedIndex].toUpperCase());
															}

															//quindi si splitta il text del fieldB sempre alla stessa maniera

															for(int wfI = 0; wfI < fieldB.wf.size(); wfI++) {

																String fieldBSplittedString[] = fieldB.wf.get(wfI).graphicalValue.split(",");
																//inserimento elementi in fieldASet
																for(int splittedIndex = 0; splittedIndex < fieldBSplittedString.length; splittedIndex++) {
																	fieldBSet.add(fieldBSplittedString[splittedIndex].toUpperCase());
																}

																arrayOfFieldBSet.add(fieldBSet);
															}

															//															String fieldBSplittedString[] = fieldB.wf.get(0).graphicalValue.split(",");
															//															//inserimento elementi in fieldASet
															//															for(int splittedIndex = 0; splittedIndex < fieldBSplittedString.length; splittedIndex++) {
															//																fieldBSet.add(fieldBSplittedString[splittedIndex].toUpperCase());
															//															}

														} else {
															if(resolveTypeOfField(typeOfFieldB).equals("listId") || resolveTypeOfField(typeOfFieldB).equals("id")) {
																//vengono usati i valueId
																getServletContext().log("lista d di id e lista b di id");

																String fieldASplittedString[] = widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).wf.get(wfIndexFieldA).valueId.split(",");
																//inserimento elementi in fieldASet
																for(int splittedIndex = 0; splittedIndex < fieldASplittedString.length; splittedIndex++) {
																	fieldASet.add(fieldASplittedString[splittedIndex].toUpperCase());
																}

																//quindi si splitta il text del fieldB sempre alla stessa maniera per ciascun elemento
																for(int wfI = 0; wfI < fieldB.wf.size(); wfI++) {

																	String fieldBSplittedString[] = fieldB.wf.get(wfI).valueId.split(",");
																	//inserimento elementi in fieldASet
																	for(int splittedIndex = 0; splittedIndex < fieldBSplittedString.length; splittedIndex++) {
																		fieldBSet.add(fieldBSplittedString[splittedIndex].toUpperCase());
																	}

																	arrayOfFieldBSet.add(fieldBSet);
																}


															}
														}

														//se l'operazione è di match
														if((widgetElementList.get(widgetIndex).op.get(opIndex).subOp.equals("notEqualMatchOp") || widgetElementList.get(widgetIndex).op.get(opIndex).subOp.equals("equal"))) {


															getServletContext().log("equals");

															//bisogna controllare che l'insieme A sia uguale ad almeno uno degli insiemi contenuto in arrayOfFieldBSet
															boolean isEqual = false;

															for(int setBIndex = 0; setBIndex < arrayOfFieldBSet.size(); setBIndex++)  {

																getServletContext().log("confronto " + fieldASet.toString() + " con " + arrayOfFieldBSet.get(setBIndex).toString());


																if(fieldASet.equals(arrayOfFieldBSet.get(setBIndex))) {
																	isEqual = true;
																	break;
																}
															}

															//controllo se gli insiemi sono uguali e l'operazione è di match
															if(isEqual) {

																getServletContext().log("i due insiemi sono uguali");

																//il valore grafico è uguale.
																widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementSelected = equalValue;
																widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementShowed = equalValue;
																widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(wfElementIndex, equalValue);
																if(equalValue) {
																	widgetElementList.get(widgetIndex).cursor = wfElementIndex;	
																}

															}else {

																getServletContext().log("i due insiemi non sono uguali");

																widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementShowed = !equalValue;
																widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementSelected = !equalValue;
																widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(wfElementIndex, !equalValue);


																if(!equalValue) {
																	widgetElementList.get(widgetIndex).cursor = wfElementIndex;	
																}

															}

														} else {
															//operazione di contenimento
															//controllo se l'insieme A contiene tutti gli delementi di B

															getServletContext().log("contains");

															boolean contains = false;

															for(int setBIndex = 0; setBIndex < arrayOfFieldBSet.size(); setBIndex++)  {
																if(fieldASet.containsAll(arrayOfFieldBSet.get(setBIndex))) {
																	contains = true;
																	break;
																}
															}

															if(contains) {

																getServletContext().log("l'insieme A contiene tutti gli insieme dell'insieme B");

																widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementSelected = equalValue;
																widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementShowed = equalValue;
																widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(wfElementIndex, equalValue);
																if(equalValue) {
																	widgetElementList.get(widgetIndex).cursor = wfElementIndex;	
																}

															}else {

																getServletContext().log("l'insieme A non contiene elementi di B");

																widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementShowed = !equalValue;
																widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementSelected = !equalValue;
																widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(wfElementIndex, !equalValue);


																if(!equalValue) {
																	widgetElementList.get(widgetIndex).cursor = wfElementIndex;	
																}

															}



														}


													}


												}




											}


											if(isNotAList) {


												//se l'operazione è di match
												if((widgetElementList.get(widgetIndex).op.get(opIndex).subOp.equals("notEqualMatchOp") || widgetElementList.get(widgetIndex).op.get(opIndex).subOp.equals("equalMatchOp"))) {

													boolean isEqual = false;

													for(int setBIndex = 0; setBIndex < valueB.size(); setBIndex++)  {
														if(valueA.toUpperCase().equals(valueB.get(setBIndex).toUpperCase())) {
															isEqual = true;
															break;
														}
													}

													if(isEqual) {

														//il valore grafico è uguale per almeno uno degli elementi della lsita di B
														widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementSelected = equalValue;
														widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementShowed = equalValue;
														widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(wfElementIndex, equalValue);
														if(equalValue) {
															widgetElementList.get(widgetIndex).cursor = wfElementIndex;	
														}

													}else {

														widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementShowed = !equalValue;
														widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementSelected = !equalValue;
														widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(wfElementIndex, !equalValue);


														if(!equalValue) {
															widgetElementList.get(widgetIndex).cursor = wfElementIndex;	
														}

													}

												}else {
													//operazione di contenimento
													//controllo se A contiene B

													boolean contains = false;

													for(int setBIndex = 0; setBIndex < valueB.size(); setBIndex++)  {
														if(valueA.toUpperCase().contains(valueB.get(setBIndex).toUpperCase())) {
															contains = true;
															break;
														}
													}

													if(contains) {

														widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementSelected = equalValue;
														widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementShowed = equalValue;
														widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(wfElementIndex, equalValue);
														if(equalValue) {
															widgetElementList.get(widgetIndex).cursor = wfElementIndex;	
														}

													}else {

														widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementShowed = !equalValue;
														widgetElementList.get(widgetIndex).wfElements.get(wfElementIndex).elementSelected = !equalValue;
														widgetElementList.get(widgetIndex).op.get(opIndex).binArray.set(wfElementIndex, !equalValue);


														if(!equalValue) {
															widgetElementList.get(widgetIndex).cursor = wfElementIndex;	
														}

													}



												}

											}


										}

									}

								}

								//operazione eseguita
								widgetElementList.get(widgetIndex).op.get(opIndex).processed = true;

								break;


							} //end of switch

							int numOfElements = 0;
							//si modifica il valore della numOfElements sulla base dei valori a true nel binArray
							for(int binIndex = 0; binIndex < widgetElementList.get(widgetIndex).op.get(opIndex).binArray.size(); binIndex++) {

								if(widgetElementList.get(widgetIndex).op.get(opIndex).binArray.get(binIndex)) {
									numOfElements++;
								}

							}

							widgetElementList.get(widgetIndex).numOfElementSelected = numOfElements;



						}






					}


				}//controllo su numero elementi in wfElements > 0



			}


			index++;

			if(index >= connectedList.size() && atLeastOne) {
				//ho fatto un ciclo completo della lista ma almeno un elemento l'ho proccessto. Faccio un altro ciclo
				atLeastOne = false;
				index = 0;

			} else 

				if(index >= connectedList.size() && !atLeastOne) {
					//ho fatto un ciclo completo della lista ma non ho proccessato nessun elemento. Devo terminare
					getServletContext().log("STALLO O COLLEGAMENTO NON CORRETTO O COMPUTAZIONE TERMINATA!!!!!!!!!!");

				}			
		}



		Gson gson = new Gson();
		String widgetElementListJson = gson.toJson(widgetElementList);
		String connectedListJson = gson.toJson(connectedList);


		//definizione del response
		response.setContentType("text/javascript");
		
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write("[" + widgetElementListJson + " , " + connectedListJson + " , " + gson.toJson(statusOfComputation) +"]");


	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
	
	private String replaceString(String text) {
		
		String nfdNormalizedString = Normalizer.normalize(text, Normalizer.Form.NFD); 
	    Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
	    return pattern.matcher(nfdNormalizedString).replaceAll("");
		
	}


}
