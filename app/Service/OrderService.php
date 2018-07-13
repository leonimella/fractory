<?php

namespace App\Service;

use App\Order;
use Illuminate\Database\QueryException;

class OrderService {

    /**
     * Create orders and returns orders with errors
     *
     * @param $orders
     * @return array
     */
    public function createOrders($orders): array
    {
        $newOrder = new Order;
        $ordersWithErrors = [];

        foreach ($orders as $order) {
            try {
                $newOrder->fill($order);
                $newOrder->save();
            } catch (QueryException $e) {
                $ordersWithErrors[] = $order;
            }
        }

        return $ordersWithErrors;
    }
}