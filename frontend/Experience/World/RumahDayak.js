import Experience from "../Experience.js";
import * as THREE from "three";

export default class RumahDayak {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.octree = this.experience.world.octree;

        this.setModel();
    }

    setModel() {
        this.model = this.resources.items.rumahDayak.scene;
        this.door = null;

        // Atur skala dan posisi awal (bisa disesuaikan nanti)
        this.model.scale.set(1, 1, 1);
        this.model.position.set(30, -15, 0);
        this.scene.add(this.model);

        const doorMesh = this.model.getObjectByName('pintu');
        let doorParent = null;

        if (doorMesh) {
            this.door = doorMesh;
            doorParent = doorMesh.parent;
            doorMesh.parent.remove(doorMesh);
        }

        this.octree.fromGraphNode(this.model);

        if (doorMesh && doorParent) {
            doorParent.add(doorMesh);
            this.experience.world.door = this.door;
        }

        // Atur agar semua mesh di dalam model bisa menghasilkan dan menerima bayangan
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }
}
