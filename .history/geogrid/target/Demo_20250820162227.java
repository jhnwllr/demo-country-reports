import org.giscience.utils.geogrid.geometry.GeoCoordinates;
import org.giscience.utils.geogrid.grids.ISEA3H;
import org.giscience.utils.geogrid.cells.GridCell;


public class Demo {
public static void main(String[] args) {
    try {
    System.out.println("Starting Demo...");
    int resolution = 9; // set your desired resolution
        ISEA3H grid = new ISEA3H(resolution);
        GridCell gc2 = grid.cellForLocation(new GeoCoordinates(52.3, 10.3));
        
        System.out.println("Latitude: " + gc2.getLat());
        System.out.println("Longitude: " + gc2.getLon());
        System.out.println("Cell ID: " + gc2.getID());
        // You can print or use gc2 here
    } catch (Exception e) {
        e.printStackTrace();
    }
    System.out.println("Demo finished.");
}}
