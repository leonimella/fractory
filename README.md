# Fractory CSV parser

This repository contains the test application for [Fractory.co](https://fractory.co/en/)

## Overview

This application work in three easy steps:

 1. Users submit a **.csv** file
 2. The application reads and process the file, returning the data for the user
 3. After returned, the user can check the data and then send to the database

In case of error in the third step, the wrong entries will be exhibit so he can make corrections and try to send the data again. Or he can update a hole new file.

## Routes

 - `/` Home of the application
 - `/orders` Lists the created orders

## Instalation

Clone the repository

     git clone https://MrLeoni@bitbucket.org/MrLeoni/fractory.git fractory-csv-parser

Change to directory

    cd fractory-csv-parser  

Create a **.env** file from **.env.example**.

Create **database.sqlite** file in *database* folder and copy the full path of the file and past after **DB_DATABASE=** inside your **.env** file.


Run composer

    composer install
    
Generate key for the application

    php artisan generate:key

Make the migration to build database schema

    php artisan migrate

Run npm or yarn

    npm install
    
	or

    yarn install

Bundle the assets

    npm run dev
    
    or
    
    yarn dev

And at last, start the serve

    php artisan serve

<br>

Open your browser and navigate to [localhost:8000](http://localhost:8000)

## Main Technologies Used

### Back-end

 - [Laravel 5.6](https://laravel.com/docs/5.6) - Framework
 - [league/csv 9.0](https://csv.thephpleague.com/9.0/installation/) - Handle CSV files

### Front-end

 - [React 16.4](https://reactjs.org/docs/getting-started.html) - User Interface
 - [Axios 0.18](https://github.com/axios/axios) - Handle XHR requests

### Others

 - OS: Ubuntu 18.04
 - IDE: PHPStorm
