import org.giscience.utils.geogrid.geometry.GeoCoordinates;
import org.giscience.utils.geogrid.grids.ISEA3H;
import org.giscience.utils.geogrid.cells.GridCell;


public class Demo {
    public static void main(String[] args) {
      int resolution = 10; // set your desired resolution  
      ISEA3H grid = new ISEA3H(resolution);
      GridCell gc2 = grid.cellForLocation(new GeoCoordinates(41.5, 6.5));
    }
}
