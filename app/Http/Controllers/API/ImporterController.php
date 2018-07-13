<?php

namespace App\Http\Controllers\API;

use App\Service\CSVService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ImporterController extends Controller
{
    private $csvService;

    public function __construct(CSVService $csvService)
    {
        $this->csvService = $csvService;
    }

    /**
     * Action responsible for parsing and store CSV files
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleCSVFile(Request $request)
    {
        try {
            $fileData = $this->csvService->getCSVFileData($request->file('file'));
            return response()->json([
                'data' => [
                    'message' => 'Orders created successfully!',
                    'status' => 'sucess',
                    'orders' => $fileData
                ],
                'links' => [
                    'self' => $request->fullUrl(),
                ],
            ], 201);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'error' => [
                    'message' => 'This type of file is not supported, please make sure you are uploading a .csv file',
                    'status' => 'danger'
                ],
                'links' => [
                    'self' => $request->fullUrl(),
                ],
            ], 400);
        }
    }
}
