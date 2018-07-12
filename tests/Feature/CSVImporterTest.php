<?php

namespace Tests\Feature;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CSVImporterTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test our application's home.
     *
     * @return void
     */
    public function testHomeroute()
    {
        $home = $this->get('/');
        $home->assertStatus(200);
    }

    /**
     * Test the storage, the parsing and HTTP status
     *
     * @return void
     */
    public function testCSVImportFeature()
    {
        Storage::fake('imported');
        $response = $this->json('POST', '/importer', [
            'file' => UploadedFile::fake()->create('data.csv'),
        ]);

        $response->assertStatus(201);

        Storage::disk('imported')->exists('data.csv');

        $this->assertDatabaseHas('orders', [
            'name' => '',
            'qty' => '',
            'thickness' => '',
            'material' => '',
            'bending' => '',
            'threading' => ''
        ]);
    }
}
