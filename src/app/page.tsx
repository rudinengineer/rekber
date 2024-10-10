"use client"
import { DollarSign, CreditCard } from "lucide-react";
import { Button } from "~/components/ui/button"
import Link from 'next/link'
import Layout from "~/layouts/Layout";
// import AlertInfo from '~/components/ui/card/alert-info'
import ItemsCard from '~/components/ui/card/items-card'
import React from "react";
import RecentTransaction from "~/components/ui/card/recent-transaction";

export default function page() {

  return (
    <Layout>
      {/* <AlertInfo /> */}

      <ItemsCard />

      <div className="mt-6 grid gap-6 grid-cols-2">
        <Link href={'/deposit'}>
          <Button className="w-full">
            <DollarSign className="mr-2 size-4" /> Deposit
          </Button>
        </Link>
        <Link href={'/withdraw'}>
          <Button className="w-full">
            <CreditCard className="mr-2 size-4" /> Withdraw
          </Button>
        </Link>
      </div>

      <RecentTransaction />
    </Layout>
  );
}