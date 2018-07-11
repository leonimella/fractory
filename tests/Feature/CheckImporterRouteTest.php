<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CheckImporterRouteTest extends TestCase
{
    /**
     * Test our application's routes.
     *
     * @return void
     */
    public function testRoutes()
    {
        $home = $this->get('/');
        $home->assertStatus(200);

        $importer = $this->get('/importer');
        $importer->assertStatus(200);
    }

    /**
     * Test the storage of file
     *
     * @return void
     */
    public function testImporter()
    {
        //
    }

    /**
     * Test the method that parses the CSV file
     *
     * @return void
     */
    public function testCSVParser()
    {
        //
    }
}
