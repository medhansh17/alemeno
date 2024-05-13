# Course Management Website - Almeno internship task

A simple course management website with course listing page, course details page and a student's dashboard.

# Installation:
1. Clone the repository:

   ```bash
   https://github.com/medhansh17/alemeno.git

   #install dependencies
   npm install

   ```
# Usage:
1. Start JSON-server

  ```bash
  cd data
  npx json-server --watch db.json --port 8000
  ```

2. Start development server
   ```bash
   npm run dev
   ```
3. Open `localhost:5173`

## Features:
1. Course Listing page: All courses listed with search by name or instructor functionality.
2. Course Detail Page: Page to show course details like instructor, schedule, etc.
3. Student Dashboard: Page to see all enrolled courses.

## Additional Features:
1. Wishlist Option: Allow users to add courses to their wishlist for future reference.
2. Like Courses: Implement a feature where users can like courses and see popular courses based on likes.
3. Update Course Progress: Enable students to track their progress within enrolled courses.
 
## Technologies Used:

- React: A JavaScript library for building user interfaces.
- Redux: A predictable state container for JavaScript apps.
- Chakra UI: A simple, modular, and accessible component library for React.
- React Router: Declarative routing for React.
- React Icons: Icons for React projects.
