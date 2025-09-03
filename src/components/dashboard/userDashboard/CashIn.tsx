import { useState } from "react";
import { useCashInMutation } from "@/redux/api/transactionApi";

const CashIn = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [cashIn, { isLoading }] = useCashInMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const numericAmount = parseFloat(amount);

    // Validation
    if (!userId) return setError("User ID is required.");
    if (isNaN(numericAmount) || numericAmount <= 0)
      return setError("Amount must be greater than 0.");
    if (!/^\d+(\.\d{1,2})?$/.test(amount))
      return setError("Amount can have up to 2 decimal places.");

    try {
      // Call your cashIn mutation from Redux Toolkit Query
      await cashIn({ userId, amount: numericAmount }).unwrap();
      setSuccess(`Successfully cashed in $${numericAmount} to user ${userId}`);
      setUserId("");
      setAmount("");
    } catch (err: any) {
      setError(err?.data?.message || "Cash in failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cash In</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter user's ID"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {isLoading ? "Processing..." : "Cash In"}
        </button>
      </form>
    </div>
  );
};

export default CashIn;
