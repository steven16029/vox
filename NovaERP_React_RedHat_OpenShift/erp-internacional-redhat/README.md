# NovaERP Global — React + Red Hat OpenShift

Frontend demostrativo de un ERP internacional. Incluye panel principal, usuarios y roles, historial de actividad, inventario, ventas, compras, finanzas, recursos humanos e internacionalización básica.

## Requisitos
- Node.js 20 o superior y npm para desarrollo local.
- Docker o Podman para construir la imagen localmente (opcional).
- Acceso a un clúster Red Hat OpenShift y permisos para crear recursos.

## Ejecutar localmente
```bash
npm install
npm run dev
```
Abrir la URL que Vite muestra en la terminal (normalmente http://localhost:5173).

## Construir para producción
```bash
npm run build
```
Los archivos optimizados quedan en `dist/`.

## Construir imagen con Podman
```bash
podman build -t novaerp-frontend:1.0.0 .
podman run --rm -p 8080:8080 novaerp-frontend:1.0.0
```
Abrir http://localhost:8080.

## Despliegue en OpenShift

### Opción A: imagen ya construida y publicada
1. Construye y publica la imagen en un registry accesible por el clúster.
2. Edita `k8s/02-deployment.yaml` y reemplaza el campo `image` por la ruta real de tu imagen.
3. Aplica los manifiestos:

```bash
oc apply -f k8s/00-namespace.yaml
oc apply -f k8s/01-configmap.yaml
oc apply -f k8s/02-deployment.yaml
oc apply -f k8s/03-service.yaml
oc apply -f k8s/04-route.yaml
```

4. Verifica:
```bash
oc -n novaerp get pods
oc -n novaerp get svc
oc -n novaerp get route novaerp
oc -n novaerp rollout status deployment/novaerp-frontend
```

5. Obtén la URL:
```bash
oc -n novaerp get route novaerp -o jsonpath='{.spec.host}'
```

### Opción B: BuildConfig de OpenShift desde Git
1. Sube el proyecto a un repositorio Git.
2. Edita `k8s/05-buildconfig.yaml` y reemplaza `https://github.com/USUARIO/REPOSITORIO.git`.
3. Crea el ImageStream y BuildConfig:
```bash
oc apply -f k8s/00-namespace.yaml
oc apply -f k8s/06-imagestream.yaml
oc apply -f k8s/05-buildconfig.yaml
oc start-build novaerp-frontend -n novaerp --follow
```
4. Para esta opción, ajusta el Deployment para consumir la imagen `novaerp-frontend:1.0.0` del ImageStream (o configura el import/pull adecuado en tu clúster).
5. Aplica ConfigMap, Deployment, Service y Route.

## Componentes Red Hat / OpenShift incluidos
- UBI 9 Node.js 20 como etapa de compilación.
- UBI 9 NGINX 1.24 como imagen runtime.
- Deployment con dos réplicas, probes y límites de recursos.
- Service interno ClusterIP.
- Route OpenShift con TLS edge y redirección HTTPS.
- ConfigMap para parámetros no sensibles.
- BuildConfig e ImageStream de ejemplo.

## Importante: alcance funcional
Esta entrega es un **frontend demostrativo**. Los datos de usuarios, inventario, ventas y actividad son de ejemplo y viven en el estado local del navegador. No existe todavía autenticación real, base de datos, API, facturación, contabilidad, conversión de divisas en tiempo real ni integración efectiva con servicios Red Hat. Para producción se deben desarrollar y desplegar servicios backend, base de datos, autenticación y controles de seguridad. No almacenar contraseñas ni secretos en ConfigMap.

## Servicios Red Hat que pueden complementar la solución
- Red Hat OpenShift: orquestación y despliegue.
- Red Hat Enterprise Linux / UBI: base de contenedores.
- Red Hat OpenShift Pipelines (Tekton): CI/CD.
- Red Hat OpenShift GitOps (Argo CD): despliegue declarativo.
- Red Hat SSO / Red Hat build of Keycloak: identidad y autenticación (según disponibilidad y soporte de versión).
- Red Hat OpenShift Data Foundation: almacenamiento persistente (si la arquitectura lo requiere).
