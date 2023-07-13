# Information for the Final Project Repository

## **`Kelompok 01`**

- **Kevin Krisna Adji Pratama**
- **Thoriq Afa Faisal Muhammad**
- **Achmad Fachturrohman**

## **`Documentation`**
- [BPMN](https://drive.google.com/file/d/1oJSDcv9h6t-Qvm9U1OK6CLruCewYmSAu/view?usp=sharing)
- [Use Case](https://drive.google.com/file/d/13ncpCd2m-KqCeqOpfQ4dzMhGBlW8hbet/view?usp=sharing) 
- [ERD](https://drive.google.com/file/d/1EhfinXKSOV_LqwsEaV-a1mKrGZyb1rsI/view?usp=sharing)
- [Dummy](https://docs.google.com/spreadsheets/d/1rRnBC3ivwvBq_UDVmlGPUkv672ncrPyBg3T30WFV7x4/edit?usp=sharing)
- [Postman](https://documenter.getpostman.com/view/23371379/2s93zB4M1n)
- [FE Repository](https://github.com/anonimuslim/fe-final-project-mcc/)
- [BE Repository](https://github.com/anonimuslim/be-final-project-mcc/)

## **`Priority`**
- Set Dummy in DB
- Fix DB Relation
- Layouting
- Modul login
- Modul Leave Form
- Modul Leave My Request
- Modul Approve & Reject
- Modul Leave History
- Email Notification
- Modul Leave Balance Status

## **`Project Task`**
- **`Kevin Krisna Adji Pratama` :**
    - Layouting Modul Login Page (FE)
    - Layouting Modul Home Page (FE)
    - Layouting Modul Leave Page (FE)
    - Layouting Modul Leave Type Page (FE)
    - Layouting Modul User Page (FE)
    - Layouting Modul Department Page (FE)
    - Layouting Modul User Profile Page (FE)
    - Display user's name and role in the menu-profile and top-nav (FE)
    - Fixed padding bug after positioning the top-nav element (FE)
    - Add View User Page (FE)
    - Add Create User Form (FE)
    - Add Approval (FE)
    - Add History (FE)
    - Create Email Notificaion Feature for Approve & Reject (BE)
    - Create Email Template Notification using Thymleaf for Approve & Reject (BE)
    - Fix email - Display actual duration data instead of null (BE)
    - Remove value from 'remarked' variable for Email Notification in Backend (FE)
    - Add visual feedback for processing approval/rejected leave request (FE)
    - Enhance Duration Display in Form - Update to show duration in 'day' or 'days' (FE)
    - Update MyRequest view to include history data (FE)
    - Update and implement fixed footer (FE)
    - Implement scrollable functionality in data table (FE)

- **`Thoriq Afa Faisal Muhammad` :**
    - Modul Employee (BE)
    - Modul Leave Type (BE)
    - Modul Department (BE)
    - Update modul leave request (BE)
    - Update modul leave balance (BE)
    - Add Create User Form (FE)
    - Add Create Request (FE)
    - Add Approval (FE)
    - Add History (FE)
    - Update leave history pada leave request service (BE)
    - Update getall data request untuk approval kecuali data request yang sedang login (service controller BE, service controller FE)
    - Edit leave request untuk cancel dan diset untuk edit leave dari data mereka yang sedang login (service controller BE, service controller FE)
    - Add edit leave request form untuk cancel (leave-content-edit.html dan leavecancel.js)
    - Add history at leave request (BE)
    - Update Service (BE)
    - Update data type datetime to date (BE)
    - Update department, employee, leaverequestapply to show manager on Employee Page (BE)
    - Fix minor: Display Manager Data in Department View Table (BE)
    - Refine Filter for Employee Approval Data Based on Logged-In Manager (BE)
    - Add day_num for leave type (BE)
    - Fix value of end_date & duration (BE)
    - Update leave history (FE)
    - Update data type datetime to date (FE)
    - Update History on My Request Page + Minor (FE)
    - Update leavecancel.js to show role on modal history & Update type 'date' to 'text' to fix 'error cannot parsing days' on leave-content.html (FE)
    - Refine Filter for Employee Approval Data Based on Logged-In Manager (FE)
    - Add day_num for duration in leave request (FE)
    - Fix Balance, Duration, Approval, Data Filter Employee by Manager (FE)

- **`Achmad Fachturrohman` :**
    - Modul Login (BE) + Login Function (FE)
    - Modul User (BE)
    - Modul Leave Status (BE)
    - Update Modul Department (BE)
    - Update Modul Employee (BE)
    - Update modul department to get manager (BE)
    - Add modul leave type (FE)
    - Add Create User Form (FE)
    - Add Approval (FE)
    - Add History (FE)
    - Add leave reject and update leave approve service (BE) & Update view leave approval page (FE)
    - Update AppUserDetail role (BE) & Update view user profile side bar (FE)
    - Add history get by id (BE) & Update view leave history page (FE)
    - Update view my request leave page (FE)
    - Update view leave form & Update has role leavetype (FE)
    - Add Leave Balance getMyBalance (BE)
    - Add Leave Balance Page & Content (FE)
    - Update Leave Form, Leave Approval, leaveform.js display duration, leaveapproval.js seperated pending request (FE)
    - Update leavetype form input (FE)
    - Update Leave & User Page (FE)
    - Add Dashboard (FE)
    - Update Dashboard & Leave Form (FE)
    - Update User Profile (FE)
    - Implement auto reload on Pending & Responded Table (FE)
    - Fix Department Table Show Manager (FE)
    - Add Update User in User Management (FE)
    - Update icon view history in my request (Leave) (FE)
    - Update department edit for dropdown option (FE)

## **`Ketentuan Repository`**

- ❌ Dilarang mengakses atau menyalahgunakan repositori kelompok lain.
- 💻 Fokus pada pengerjaan kelompok masing-masing.
- 🤓 Untuk kelompok lain bisa sharing, melihat proses, serta memicu semangat untuk memberikan hasil yang terbaik pada projectnya masing-masing. 💪💪💪

## **`Ketentuan Implementasi Repository`**

- Silahkan clone repository yang sudah disediakan untuk setiap kelompoknya masing-masing.
- Setalah clone, silahkan masukkan folder project `backend` & `frontend` yang nanti teman-teman buat.

**`NOTE:` di bawah ini merupakan contoh struktur dari folder project.**

```
|-- .gitignore
|-- README.md
|-- serverapp
    |-- .mvn
    |-- src
        |-- main
        |-- test/java/id/co/mii/serverapp
    |-- .gitignore
    |-- mvnw
    |-- mvwn.cmd
    |-- pom.xml
|-- clientapp
    |-- .mvn
    |-- src
        |-- main
        |-- test/java/id/co/mii/clientapp
    |-- .gitignore
    |-- mvnw
    |-- mvwn.cmd
    |-- pom.xml
```
