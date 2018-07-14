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
     * Test the CSV file parsing and HTTP status
     *
     * @return void
     */
    public function testCSVParse()
    {
        Storage::fake('imported');
        $response = $this->json('POST', '/api/importer/csv', [
            'file' => UploadedFile::fake()->create('data.csv'),
        ]);

        $response->assertStatus(200);
        Storage::disk('imported')->exists('data.csv');
        $response->assertJsonStructure([
            'data' => [],
            'links' => []
        ]);
    }

    /**
     * Test the creation of new orders
     *
     * @return void
     */
    public function testOrdersCreationRoute()
    {
        $validData = [
            [
                'bending' => '',
                'material' => 'S235',
                'name' => '100965--',
                'qty' => '3',
                'thickness' => '12',
                'threading' => 'Yes'
            ],
            [
                'bending' => 'Yes',
                'material' => 'S235',
                'name' => '100954--',
                'qty' => '2',
                'thickness' => '5',
                'threading' => ''
            ],
            [
                'bending' => '',
                'material' => 'S235',
                'name' => '100962--',
                'qty' => '5',
                'thickness' => '1',
                'threading' => ''
            ]
        ];

        $invalidData = [
            [
                'thickness' => '12',
                'threading' => 'Yes'
            ]
        ];

        $response = $this->json('POST', '/api/orders/create', [
            'orders' => $validData
        ]);
        $response->assertStatus(201);

        $response = $this->json('POST', '/api/orders/create', [
            'orders' => $invalidData
        ]);
        $response->assertStatus(400);
    }
}
