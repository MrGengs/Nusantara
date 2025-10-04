import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

export default class WorldModel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.world = this.resources.items.world;
    this.actualWorld = this.world.scene;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.actualWorld.scale.set(5, 5, 5);
    this.actualWorld.position.set(10, -15, 0);

    this.actualWorld.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.scene.add(this.actualWorld);

    this.octree = this.experience.world.octree;

    // Update world matrix dan build octree
    this.scene.updateMatrixWorld(true);
    this.octree.fromGraphNode(this.actualWorld);

    // Tambahkan plane collider di bagian bawah world untuk mencegah player jatuh
    const boundingBox = new THREE.Box3().setFromObject(this.actualWorld);
    const floorGeometry = new THREE.PlaneGeometry(
      (boundingBox.max.x - boundingBox.min.x) * 2,
      (boundingBox.max.z - boundingBox.min.z) * 2
    );
    const floorMesh = new THREE.Mesh(
      floorGeometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(
      this.actualWorld.position.x,
      boundingBox.min.y - 0.1,
      this.actualWorld.position.z
    );
    this.scene.add(floorMesh);
    this.octree.fromGraphNode(floorMesh);
  }

  setAnimation() {}

  resize() {}

  update() {}
}
