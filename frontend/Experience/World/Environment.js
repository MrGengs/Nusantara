import Experience from "../Experience.js";
import * as THREE from "three";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setEnvironment();
    }

    setEnvironment() {
        this.environmentMap = {};
        this.environmentMap.intensity = 0;
        this.environmentMap.texture = this.resources.items.environment;
        this.environmentMap.texture.outputColorSpace = THREE.SRGBColorSpace;

        this.scene.background = this.environmentMap.texture;

        const light = new THREE.AmbientLight(0x404040, 4); // soft white light
        this.scene.add(light);

        this.sunLight = new THREE.DirectionalLight("#ffffff", 1.5);

        this.sunLight.position.set(1.5, 7, -3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.shadow.camera.left = -10;
        this.sunLight.shadow.camera.right = 10;
        this.sunLight.shadow.camera.top = 10;
        this.sunLight.shadow.camera.bottom = -10;
        this.scene.add(this.sunLight);
        this.scene.add(this.sunLight.target);

        // this.scene.environment = this.environmentMap.texture;

        // console.log(this.scene);

        // this.environmentMap.updateMaterials = () => {
        //     this.scene.children.forEach((child) => {
        //         if (child instanceof THREE.Group) {
        //             console.log(child.children[0]);
        //             if (
        //                 child.children[0] instanceof THREE.Mesh &&
        //                 child.children[0].material instanceof
        //                     THREE.MeshPhysicalMaterial
        //             ) {
        //                 child.children[0].material.envMap =
        //                     this.environmentMap.texture;
        //                 child.children[0].material.envMapIntensity =
        //                     this.environmentMap.intensity;
        //                 child.children[0].material.needsUpdate = true;
        //             }
        //         }
        //     });
        // };
        // this.environmentMap.updateMaterials();
    }

    update() {
        if (this.experience.world.player) {
            this.sunLight.position.x = this.experience.world.player.player.collider.end.x;
            this.sunLight.position.y = this.experience.world.player.player.collider.end.y + 5;
            this.sunLight.position.z = this.experience.world.player.player.collider.end.z;
            this.sunLight.target.position.copy(this.experience.world.player.player.collider.end);
        }
    }
}
