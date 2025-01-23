# UI Techinal Assessment


## Project Setup
1. Clone the repository [UI Technical Assessment](https://github.com/mzwabantu/ui-technical-assessment)
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the Angular Application at port:[4200](http://localhost:4200).
4. Run `npm start:mock-api` to start the mock API.
5. Run `npm start:dev` to start the mock API and the Angular application at once.
6. Run `npm run test` to run component tests using jest.
7. Run `npm run build` to build the project for dev.
8. Run `npm run build --prod` to build for production, remember to set production `apiUrl` variable in production environment.

## Backend Endpoints
- **Base Url**: [http://localhost:3000](http://localhost:3000)
- **Datasets**: [/datasets](http://localhost:3000/datasets)
- **Stats**: [/stats](http://localhost:3000/stats)
- **Profile**: [/profile](http://localhost:3000/profile)
- **Activity**: [/activity](http://localhost:3000/activity)
- **Connections**: [/connections](http://localhost:3000/connections)
- **Notifications**: [/notifications](http://localhost:3000/notifications)

## Technical Decisions
- **Folder Structure**: Modular structure seperates core, shared, and features for scalability.
- **Mock API**: Used json-server to simulate backend interactions for development purposes.
- **Styling**: SCSS chosen for better maintainability, adherence to desgn system and to show my css skills.
- **Linting**: Configured ESLint and Prettier for clean and consistend code formatting.
- **State Management**: NGRx used for managing the state, ensuring predictable state updates and easy debugging.
- **Routing**: Used Angular Router for navigation, with lazy loading for optimal initial load time.
- **Component Testing**: Jest is used for unit testing Angular components and services. 
- **Material Design**:: Integrated Angular Material components such as buttons, tables, icons, and tooltips for a consistent UI/UX across the application. 
- **Service Layer**: The service layer is used to interact with mock backend APIs, manage business logic, and dispatch actions via NgRx. For example, the ActivityService handles logging activities and fetching random activities.
- **Reusable Components**: Created reusable components, such as a data table ` (DataTableComponent)`, for displaying datasets in a table with features like pagination and sorting. Custom components like alerts and modals were also created for managing notifications and other UI elements.
- **Environment Configuration**:  Environment-specific configurations for the API URLs (e.g., development vs. production) were managed in the environment.ts files, making it easy to switch between mock and real backends as needed.


## Interactions
**Activity**
- When ever you refresh the page a new activity logged to the NGRx store, 
- When the logActivity action is dispatched a side effect is triggered to update the backend, 
- On page refresh the store will also be updated will getActivity request to the backend,
- Lastly when you click on logout a logout activity type is logged - triggering side effect as mentioned

**Notifications**
- Are stored in the AppState with a read property set to false by default
- When ever you click on one from the drop down in the banner, read is set to true thus hiding it from the dropdown
- No side effects are perfomed on notication actions there the state resets or relaod

**Routing**
- On most of the buttons and link you will be routed to a placeholder page.

