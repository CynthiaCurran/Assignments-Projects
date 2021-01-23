
import java.awt.Color;
import javax.media.j3d.*;
import javax.vecmath.*;

public class Pyramid extends Shape3D {
	private Transform3D changeSize;
	private Transform3D resize;
	private double height = 10; 
	private double width = 10; 
	private double depth = 10;
	private TriangleArray pyramidGeometry;
	private TriangleArray pyramidEdgeGeometry;
	private Appearance app;
	
	float tx = 0.0f;
	Point3f frontL = new Point3f(0.5f, -0.4f, 0.4f); // front left
	Point3f frontR = new Point3f(1.3f, -0.4f, 0.4f); // front right
	Point3f backR = new Point3f(1.3f, -0.4f, -0.4f); // back right
	Point3f backL = new Point3f(0.5f, -0.4f, -0.4f); // back left
	Point3f top = new Point3f(0.9f, 0.4f, 0.0f); // top
	
	public Appearance getApp() {
		return app;
	}


	public void setApp(Appearance app) {
		this.app = app;
	}
	
	public double getHeight() {
		return height;
	}


	public void setHeight(double height) {
		this.height = height;
	}


	public double getWidth() {
		return width;
	}


	public void setWidth(double width) {
		this.width = width;
	}


	public double getDepth() {
		return depth;
	}


	public void setDepth(double depth) {
		this.depth = depth;
	}

	public void setResize(Transform3D resize) {
		this.resize = resize;
	}


	public Transform3D getChangeSize() {
		return changeSize;
	}


	public void setChangeSize(Transform3D changeSize) {
		this.changeSize = changeSize;
	} 
    
    public Pyramid() {
		pyramidGeometry = new TriangleArray(18, TriangleArray.COORDINATES | GeometryArray.COLOR_3);
		pyramidGeometry.setCapability(TriangleArray.ALLOW_COLOR_WRITE);
		
		face(pyramidGeometry, 0, frontR, top, frontL, new Color3f(Color.ORANGE));
		face(pyramidGeometry, 3, backR, top, frontR, new Color3f(Color.BLUE));
		face(pyramidGeometry, 6, backL, top, backR, new Color3f(Color.RED));
		face(pyramidGeometry, 9, frontL, top, backL, new Color3f(Color.GREEN));
		face(pyramidGeometry, 12, backL, backR, frontR, new Color3f(Color.MAGENTA));
		face(pyramidGeometry, 15, frontR, frontL, backL, new Color3f(Color.MAGENTA));		

		this.setGeometry(pyramidGeometry);
		this.setAppearance(new Appearance());

	 	Transform3D defaultSize = new Transform3D();
	 	defaultSize.setScale(new Vector3d(0.4, 0.4, 0.4));
	 	setResize(defaultSize);
    }
    
    private void face(TriangleArray pyramidGeometry, int index, Point3f coordinate1, Point3f coordinate2, Point3f coordinate3, Color3f color) {
    	pyramidGeometry.setCoordinate(index, coordinate1);
    	pyramidGeometry.setCoordinate(index+1, coordinate2);
    	pyramidGeometry.setCoordinate(index+2, coordinate3);
    	pyramidGeometry.setColor(index, color);
    	pyramidGeometry.setColor(index+1, color);
    	pyramidGeometry.setColor(index+2, color);
    }
    
    private void edge(TriangleArray pyramidEdgeGeometry, int index, Point3f coordinate1, Point3f coordinate2, Point3f coordinate3, Color3f color) {
    	pyramidEdgeGeometry.setCoordinate(index, coordinate1);
    	pyramidEdgeGeometry.setCoordinate(index+1, coordinate2);
    	pyramidEdgeGeometry.setCoordinate(index+2, coordinate3);
    	pyramidEdgeGeometry.setColor(index, color);
    	pyramidEdgeGeometry.setColor(index+1, color);
    	pyramidEdgeGeometry.setColor(index+2, color);
    }
    
    public Node pyramidEdges() {
		pyramidEdgeGeometry = new TriangleArray(18, TriangleArray.COORDINATES | GeometryArray.COLOR_3);
		pyramidEdgeGeometry.setCapability(TriangleArray.ALLOW_COLOR_WRITE);
		
		edge(pyramidEdgeGeometry, 0, frontR, top, frontL, new Color3f(Color.BLACK));
		edge(pyramidEdgeGeometry, 3, backR, top, frontR, new Color3f(Color.BLACK));
		edge(pyramidEdgeGeometry, 6, backL, top, backR, new Color3f(Color.BLACK));
		edge(pyramidEdgeGeometry, 9, frontL, top, backL, new Color3f(Color.BLACK));
		//edge(pyramidEdgeGeometry, 12, backL, backR, frontR, Colors.BLACK);
		//edge(pyramidEdgeGeometry, 15, frontR, frontL, backL, Colors.BLACK);
				
		app = new Appearance();
		app.setCapability(Appearance.ALLOW_LINE_ATTRIBUTES_WRITE);
		
		// Set up the polygon attributes
        PolygonAttributes pa = new PolygonAttributes();
        pa.setPolygonMode(pa.POLYGON_LINE);
        pa.setCullFace(pa.CULL_NONE);
        pa.setPolygonOffsetFactor(-0.5f);
        app.setPolygonAttributes(pa);
        
        LineAttributes lineattributes = new LineAttributes();
        lineattributes.setLineWidth(1.0f);
        lineattributes.setLineAntialiasingEnable(true);
        lineattributes.setLinePattern(LineAttributes.PATTERN_SOLID);
        
        app.setLineAttributes(lineattributes);
        
        Shape3D pyramidEdges = new Shape3D();
		pyramidEdges.setGeometry(pyramidEdgeGeometry);
		pyramidEdges.setAppearance(app);
		
		return pyramidEdges;
    }

}