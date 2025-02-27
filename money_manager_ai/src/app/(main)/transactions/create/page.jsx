import { AddTransactionForm } from "@/components/transaction-form";
import { getUserAccount } from "@/api/dashboard";
import { getTransaction } from "@/api/transaction";
import { defaultCategories } from "@/data/catagories";

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccount();
  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}