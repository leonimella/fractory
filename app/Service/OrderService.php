<?php

namespace App\Service;

use App\Order;
use Illuminate\Database\QueryException;

class OrderService {

    public function getNotNullableColumn(QueryException $exception)
    {
        $errorInfo = $exception->errorInfo[2];
        if (strpos($errorInfo, 'NULL')) {
            $errorInfo = explode(':', $errorInfo);
            $errorInfo[1] = str_replace($errorInfo[1], ' orders', '');
            $nullColumn = $errorInfo[1];
            dd($nullColumn);
        }
    }
}