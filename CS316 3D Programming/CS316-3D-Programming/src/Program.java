
import java.awt.*;
import javax.swing.*;
import com.sun.j3d.utils.universe.*;
import com.sun.j3d.utils.geometry.ColorCube;
import javax.media.j3d.*;
import javax.vecmath.*;

public class Program extends JFrame{

	public Program() {
		
		//Set up the JFrame
		JPanel panel = new JPanel();
		panel.setLayout(new BorderLayout());
		panel.setPreferredSize(new Dimension(300, 300));
		getContentPane().add(panel, BorderLayout.CENTER);

		
		//Starting the 3D Canvas and universe
		GraphicsConfiguration configuration = SimpleUniverse.getPreferredConfiguration();
		Canvas3D canvas = new Canvas3D(configuration);
		SimpleUniverse universe = new SimpleUniverse(canvas);
		universe.getViewingPlatform().setNominalViewingTransform();	//Move the camera back
		universe.getViewer().getView().setMinimumFrameCycleTime(5);	//Refresh every 5 milliseconds
		
		
		//Starting the scene
		BranchGroup scene = new BranchGroup();
		
		//The rotations the scene will apply
		Transform3D rotate1 = new Transform3D();
		Transform3D rotate2 = new Transform3D();
		rotate1.rotX(Math.PI / 4.0d);
		rotate2.rotY(Math.PI / 4.0d);
		rotate1.mul(rotate2);
		TransformGroup tg = new TransformGroup(rotate1);
		tg.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
		scene.addChild(tg);
		
		//Attach the objects to the scene
		tg.addChild(new ColorCube(0.4));
		tg.addChild(new Pyramid());
		
		//Make the objects spin
		Transform3D y = new Transform3D();
		y.rotZ(Math.PI / 4);
		Alpha rotationAlpha = new Alpha(-1, 4000);
		RotationInterpolator rotator = new RotationInterpolator(rotationAlpha, tg, y, 0.0f, (float) Math.PI*2.0f);
		rotator.setSchedulingBounds(new BoundingSphere( new Point3d(0, 0, 0), 100.0));
		scene.addChild(rotator);
		scene.compile();
		
		//add the scene to the universe
		universe.addBranchGraph(scene);
		
		//add the canvas to the JFrame
		panel.add(canvas, BorderLayout.CENTER);
		
		//Finish the JPanel
		setTitle("3D Programming Assignment");
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		pack();
		setVisible(true);
	}
}
