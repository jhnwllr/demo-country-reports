// NOTE: let your IDE auto-import the classes from the geogrid JAR.
// The class names used below come from the README.

import java.util.*;
// import org.giscience.utils.geogrid.geometry.FaceCoordinates;
// import org.giscience.utils.geogrid.cells.GridCellIDType;
/* import geogrid classes (your IDE will auto-import):
   ISEA3H, GridCell, GeoCoordinates, ISEAProjection, IdentifierType
*/

public class Demo {
  public static void main(String[] args) {
    // Example A: which ISEA3H cell covers a point?
    // var grid = new ISEA3H(10);                 // resolution 10
    // var cell = grid.cellForLocation(55.6761, 12.5683); 
    // System.out.println("Cell ID (non-adaptive): " + cell.getID());
    // System.out.println("Cell ID (adaptive unique): " +
  // cell.getID(GridCellIDType.ADAPTIVE_UNIQUE));

    // Example B: get all cells in a lat/lon bbox and print a few
    // var cells = grid.cellsForBound(55.5, 55.8, 12.4, 12.8);
    // int n = 0;
    // for (GridCell gc : cells) {
      // System.out.printf("%d,%f,%f,%s%n",
          // gc.getResolution(), gc.getLat(), gc.getLon(),
          // gc.getID(GridCellIDType.ADAPTIVE_UNIQUE));
      // if (++n == 5) break;
    // }

    // Example C: ISEA projection round-trip
    // var proj = new ISEAProjection();
    // var c = proj.icosahedronToSphere(new FaceCoordinates(2, 20.3, 12.5));
    // var back = proj.sphereToIcosahedron(new GeoCoordinates(c.getLat(), c.getLon()));
    // System.out.println("Face back: " + back.getFace());
  }
}
