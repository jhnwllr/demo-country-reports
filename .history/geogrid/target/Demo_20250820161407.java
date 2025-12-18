import org.giscience.utils.geogrid.geometry.GeoCoordinates;
import org.giscience.utils.geogrid.grids.ISEA3H;
import org.giscience.utils.geogrid.cells.GridCell;


public class Demo {
public static void main(String[] args) {
    try {
        int resolution = 10;
        ISEA3H grid = new ISEA3H(resolution);
        GridCell gc2 = grid.cellForLocation(new GeoCoordinates(41.5, 6.5));
        
        System.out.println("Latitude: " + gc2.getLat());
        System.out.println("Longitude: " + gc2.getLon());
        System.out.println("Cell ID: " + gc2.getID());
        // You can print or use gc2 here
    } catch (Exception e) {
        e.printStackTrace();
    }
}}
