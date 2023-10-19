# ApplycAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files and then save the files.

## Esta web asemeja la aplicación de Applyc del Lyceo Francés de Gran Canaria

Aplicación desarrollada en unas 4 horas, debido a que solo se realizó el front de la página:

- El header
- El cuerpo
- El diseño de las cartas

## \*Acutalización\*

Realmente _no_ fueron 4 días, he estado trabajando unos cuantos con la intención de recrear la página original de Applyc _lo máximo posible_.
Dejaré esta página "_funcional_", como página para mi **Portfolio personal**. En caso de querer utilizarla, estaría guay que pusieran mi nombre por algún lado dentro de la página física como reconocimiento.

### Distribución de carpetas:

- app
  - classes (clases funcionales \*1)
  - components
  - interfaces (\*2)
  - pages
  - services

*1 - Se definen clases, con constructores, y funciones propias
*2 - A diferencia de las clases, en este caso solo se definen los datos que tendrá un tipo en concreto.

#### Clases

Existe la clase _Person_, esta contiene:

- 4 Atributos:

  - \_id: string;
  - personalData: PersonalData;
  - contactData: ContactData;
  - professionalData: ProfessionalData;

- constructor(
  \_id: string,
  personalData?: PersonalData,
  contactData?: ContactData,
  professionalData?: ProfessionalData
  )

Con capacidad suficiente para omitir los datos que no son necesarios (todos menos el \_id del usuario, ya que este es necesario para acceder a la BBDD).
En otros lenguajes existe la sobrecarga de funciones, que consiste, de manera sencilla, en nombrar 2 o más funciones con los mismos nombres, pero que cada función tenga distintos parámetros.

- Getters

  - getId()
  - getUserInfoJSON()
  - getName()
  - isAdmin()
  - getEmail()
  - getFullUsername()
  - getPersonalData()
  - getContactData()
  - getProfessionalData()

- Setters
  - setUsername(username: string)
  - setPersonalEmail(email: string)
  - setCorporativeEmail(email: string)
- Métodos toString (Retorna las distintas variables como string)

#### Interfaces

Existe la interfaz _Card_, que contiene los datos necesarios para cualquier carta:

- url: a donde redirigirá la carta al ser pulsada
- img: la imagen de la carta
- name: el nombre que aparecerá en la carta

#### Components

- add-user: Diálogo para crear un usuario nuevo.
- card: Diseño por defecto de las cartas que se muestran en el home
- footer: Footer de la página
- header: Header de la página
- person-card: Diseño que aparece en el apartado Directorio de la página

#### Pages

- access: Página de inicio de sesión para los usuarios que _YA_ tienen una cuenta
- directorio: Página donde observamos los usuarios registrados en la página
- documentacion: Not done yet
- error:
  - not-found:
  - not-logged: Página a la que accedes si no estás loggeado e intentas acceder a una página en la que tienes que haber iniciado sesión (todos los accesos de directorio, parking, personal)
  - not-permission: Página a la que accedes si no tienes permisos de administrador, e intentas hacer alguna acción del mismo
- home: Landing page donde podremos ver las aplicaciones principales del lycèe
- parking: Not done yet
- personal: Not done yet (Página para editar usuarios)

#### Services

- Auxiliares de componentes:
  - Dialog: abre diálogos y se pueden añadir datos al mismo
  - Snackbar: Muestra durante X segundos un pequeño mensaje en la esquina superior derecha de la página.
- Authentication: Tiene la capacidad de logear, registrar y desloguear usuarios gracias a la Autentificación de Firebase, además, aporta funcionalidades que sirven de ayuda en otros servicios, componentes o páginas:
  - isUserLogged()
  - getAuth()
  - getApp()
- Authentication: Tiene la capacidad de recoger y añadir (en algún momento tendrá la capacidad de modificar datos) los datos de la BBDD de Firebase:
  - getAgetUserInfo()
  - addNewUser()
  - getAllUserInformation()
- ErrorManager: Tiene un mapa con los posibles errores y gracias a la función ManageErrors, devuelve un acceso a la traducción del error en concreto.
- TranslateService: Este servicio es el encargado de cambiar el idioma de la aplicación.
