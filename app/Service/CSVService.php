<?php

namespace App\Service;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use League\Csv\Reader;

class CSVService {

    /**
     * Parse the CSV file and return the data from it
     *
     * @param UploadedFile $file
     * @return array
     */
    public function getCSVFileData(UploadedFile $file): array
    {
        $path = $file->storeAs(
            'imported.orders', $file->getFilename() . '.csv'
        );

        $csv = Reader::createFromPath(storage_path() . '/app/' . $path, 'r');
        $csvHeaders = $csv->fetchOne();
        $csvData = $csv->fetchAll();
        $data = [];

        foreach ($csvData as $singleData) {
            $row = [];
            foreach ($csvHeaders as $csvHeaderKey => $csvHeaderColumn) {
                $csvHeaderColumn = strtolower($csvHeaderColumn);
                $row[$csvHeaderColumn] = $singleData[$csvHeaderKey];
            }

            $data[] = $row;
        }

        Storage::delete('/' . $path); // Deleting the file after getting the data

        return $data;
    }
}
