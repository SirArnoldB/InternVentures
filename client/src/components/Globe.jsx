import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import ThreeGlobe from "three-globe";

function GlobeComponent() {
  const globeElement = useRef();
  const [countries, setCountries] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [altitude, setAltitude] = useState(0.1);
  // eslint-disable-next-line no-unused-vars
  const [transitionDuration, setTransitionDuration] = useState(1000);

  useEffect(() => {
    // Fetch GeoJSON data
    fetch(
      "//unpkg.com/three-globe/example/hexed-polygons/ne_110m_admin_0_countries.geojson"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  useEffect(() => {
    if (countries && !globeElement.current.children.length) {
      // Create globe
      const globe = new ThreeGlobe()
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .hexPolygonsData(countries)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonColor(
          () =>
            `#${Math.round(Math.random() * Math.pow(2, 24))
              .toString(16)
              .padStart(6, "0")}`
        )
        .labelsData(countries)
        .labelLat((d) => d.properties.latitude)
        .labelLng((d) => d.properties.longitude)
        .labelAltitude(10)
        .labelText((d) => d.properties.name)
        .labelSize(0.5)
        .labelDotRadius(0.5)
        .labelColor(() => "#444")
        .labelResolution(3);

      // Setup scene
      const scene = new THREE.Scene();

      // Add globe to scene
      scene.add(globe);

      // Add lights
      scene.add(new THREE.AmbientLight(0xbbbbbb, Math.PI));
      scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

      // Setup renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      globeElement.current.appendChild(renderer.domElement);

      // Setup camera
      const camera = new THREE.PerspectiveCamera();

      // aspect ratio of the camera (width / height)
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.position.z = 250;

      // Add camera controls
      const tbControls = new TrackballControls(camera, renderer.domElement);
      tbControls.minDistance = 101;
      tbControls.rotateSpeed = 5;
      tbControls.zoomSpeed = 0.5;

      // Kick-off renderer
      (function animate() {
        tbControls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      })();
    }
  }, [altitude, countries, globeElement, transitionDuration]);

  return (
    <>
      <div ref={globeElement} />
    </>
  );
}

export default GlobeComponent;
