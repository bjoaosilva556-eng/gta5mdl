/**
 * GT5MDLLoader
 * Carrega arquivos .gt5mdl (formato próprio do jogo GTA 5 MDL).
 * Um arquivo .gt5mdl é, na verdade, um JSON que descreve:
 *  - tipo de malha (box, sphere, cylinder)
 *  - dimensões
 *  - posição, rotação, escala
 *  - cor
 *  - propriedades (dano, cadência, munição, etc.)
 *
 * Uso:
 *   const loader = new GT5MDLLoader();
 *   loader.load('models/weapon.gt5mdl', (obj) => scene.add(obj.scene));
 */

import * as THREE from 'three';

export class GT5MDLLoader {
  constructor() {}

  load(url, onLoad, onProgress, onError) {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`GT5MDL: não foi possível carregar ${url} (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (data.format !== 'gt5mdl') {
          console.warn(`GT5MDL: ${url} não tem formato gt5mdl válido`);
        }
        const obj = this.parse(data);
        onLoad(obj);
      })
      .catch((err) => {
        if (onError) onError(err);
        else console.error(err);
      });
  }

  parse(data) {
    const group = new THREE.Group();
    group.userData = { format: 'gt5mdl', name: data.name || 'gt5mdl', type: data.type || 'generic' };

    // Criar malha base
    let mesh;
    const m = data.mesh || { type: 'box', width: 1, height: 1, depth: 1 };
    const color = data.color || 0xffffff;

    if (m.type === 'sphere') {
      const geo = new THREE.SphereGeometry(m.radius || 0.5, 16, 16);
      mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color }));
    } else if (m.type === 'cylinder') {
      const geo = new THREE.CylinderGeometry(m.radiusTop || 0.5, m.radiusBottom || 0.5, m.height || 1, 16);
      mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color }));
    } else {
      // box padrão
      const geo = new THREE.BoxGeometry(m.width || 1, m.height || 1, m.depth || 1);
      mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color }));
    }

    if (data.position) mesh.position.set(data.position.x || 0, data.position.y || 0, data.position.z || 0);
    if (data.rotation) mesh.rotation.set(data.rotation.x || 0, data.rotation.y || 0, data.rotation.z || 0);
    if (data.scale) mesh.scale.set(data.scale.x || 1, data.scale.y || 1, data.scale.z || 1);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    group.add(mesh);

    // Propriedades customizadas (armas, etc.)
    group.userData.properties = data.properties || {};

    return { scene: group, mesh, data };
  }
}
