<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ImporterController extends Controller
{
    /**
     * Action responsible for parsing and store CSV files
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleCSVFile(Request $request)
    {
        $path = $request->file('file')->storeAs(
            'imported.orders', $request->file('file')->getFilename() . '.csv'
        );
        dd($path);
        return response()->json([], 201);
    }
}
