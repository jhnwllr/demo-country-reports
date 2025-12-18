import org.giscience.utils.geogrid.projections.ISEAProjection;
import org.giscience.utils.geogrid.geometry.GeoCoordinates;
import org.giscience.utils.geogrid.geometry.FaceCoordinates;

public class Demo {
    public static void main(String[] args) {
        ISEAProjection projection = new ISEAProjection();
        try {
            GeoCoordinates c = projection.icosahedronToSphere(new FaceCoordinates(2, 20.3, 12.5));
            System.out.println("Latitude: " + c.getLat());
            System.out.println("Longitude: " + c.getLon());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
