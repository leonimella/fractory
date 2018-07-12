<?php

namespace App\Service;

use Illuminate\Http\UploadedFile;
use League\Csv\Reader;

class CSVService {
    public function getCSVFileData(UploadedFile $file): array
    {
        $path = $file->storeAs(
            'imported.orders', $file->getFilename() . '.csv'
        );

        $csv = Reader::createFromPath(storage_path() . '/app/' . $path, 'r');
        $csvHeaders = $csv->fetchOne();
        $csvData = $csv->fetchAll();
        $data = [];

        unset($csvData[0]); // Removing headers

        foreach ($csvData as $singleData) {
            $row = [];
            foreach ($csvHeaders as $csvHeaderKey => $csvHeaderColumn) {
                $csvHeaderColumn = strtolower($csvHeaderColumn);
                $row[$csvHeaderColumn] = $singleData[$csvHeaderKey];
            }

            $data[] = $row;
        }

        return $data;
    }
}