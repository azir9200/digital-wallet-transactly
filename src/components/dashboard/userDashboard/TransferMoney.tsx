import { useState } from "react";
import { useTransferMutation } from "@/redux/api/transactionApi";

const TransferMoney = () => {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [fee, setFee] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [transferMoney, { isLoading }] = useTransferMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const numericAmount = parseFloat(amount);
    const numericFee = fee ? parseFloat(fee) : 0;

    // Basic validation
    if (!receiverId) return setError("Receiver ID is required.");
    if (isNaN(numericAmount) || numericAmount <= 0)
      return setError("Enter a valid amount greater than 0.");
    if (!/^\d+(\.\d{1,2})?$/.test(amount))
      return setError("Amount can have up to 2 decimal places.");
    if (fee && !/^\d+(\.\d{1,2})?$/.test(fee))
      return setError("Fee can have up to 2 decimal places.");

    try {
      await transferMoney({
        receiver: receiverId,
        amount: numericAmount,
        fee: numericFee,
        type: "TRANSFER",
      }).unwrap();
      setSuccess("Transfer successful!");
      setReceiverId("");
      setAmount("");
      setFee("");
    } catch (err: any) {
      setError(err?.data?.message || "Transfer failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transfer Money</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Receiver ID</label>
          <input
            type="text"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter receiver's user ID"
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

        <div>
          <label className="block mb-1 font-medium">Fee (optional)</label>
          <input
            type="text"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter fee if any"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Transferring..." : "Transfer"}
        </button>
      </form>
    </div>
  );
};

export default TransferMoney;
