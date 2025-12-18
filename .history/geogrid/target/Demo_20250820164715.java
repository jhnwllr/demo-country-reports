import org.giscience.utils.geogrid.geometry.GeoCoordinates;
import org.giscience.utils.geogrid.grids.ISEA3H;
import org.giscience.utils.geogrid.cells.GridCell;


public class Demo {
public static void main(String[] args) {
    if (args.length < 3) {
        System.out.println("Usage: java Demo <resolution> <lat> <lon>");
        return;
    }  
    try {
        System.out.println("Starting Demo...");
        int resolution = Integer.parseInt(args[0]);
        double lat = Double.parseDouble(args[1]);
        double lon = Double.parseDouble(args[2]);    
        ISEA3H grid = new ISEA3H(resolution);
        GridCell gc2 = grid.cellForLocation(new GeoCoordinates(lat, lon));        
        // System.out.println("Latitude: " + gc2.getLat());
        // System.out.println("Longitude: " + gc2.getLon());
        // System.out.println("Cell ID: " + gc2.getID());
        System.out.println(gc2.getID());
    } catch (Exception e) {
        e.printStackTrace();
    }
    // System.out.println("Demo finished.");
}}
