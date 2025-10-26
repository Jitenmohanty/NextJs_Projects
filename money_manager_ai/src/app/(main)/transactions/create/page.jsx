import { AddTransactionForm } from "@/components/transaction-form";
import { getUserAccounts } from "@/api/dashboard";
import { getTransaction } from "@/api/transaction";
import { defaultCategories } from "@/data/catagories";

export default async function AddTransactionPage({ searchParams }) {
  const resolvedSearchParams = await searchParams; // ✅ Await first

  const accounts = await getUserAccounts();
  const editId = resolvedSearchParams?.edit;

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