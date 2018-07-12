<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImporterController extends Controller
{
    public function handleCSVFile(Request $request)
    {
        $file = $request->file('file[]');
        dd($file);
        return response()->json($file, 201);
    }
}
