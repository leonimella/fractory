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
        $ordersWithErrors = [];

        foreach ($orders as $order) {
            $newOrder = new Order;
            $order['bending'] = empty($order['bending']) || $order['bending'] == 'No' ? false : true;
            $order['threading'] = empty($order['threading']) || $order['threading'] == 'No' ? false : true;

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