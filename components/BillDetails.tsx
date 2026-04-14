"use client";

type BillItem = {
  id: string;
  name: string;
  description: string;
  amount: number;
};

interface BillDetailsProps {
  name: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
}

export default function BillDetails({
  name,
  items,
  subtotal,
  tax,
}: BillDetailsProps) {
  const total = subtotal + tax;

  const format = (n: number) =>
    "Rp " + Math.round(n).toLocaleString("id-ID");

  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col h-full">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h3 className="text-xl font-bold">{name}&apos;s Share</h3>
        <span className="text-sm text-gray-500">
          {items.length} items
        </span>
      </div>

      {/* ITEMS */}
      <div className="flex-1 space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Belum ada item
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-400">
                  {item.description}
                </p>
              </div>

              <p className="font-bold">
                {format(item.amount)}
              </p>
            </div>
          ))
        )}
      </div>

      {/* TOTAL */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{format(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm mt-1">
          <span>Tax</span>
          <span>{format(tax)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg mt-3">
          <span>Total</span>
          <span>{format(total)}</span>
        </div>
      </div>
    </div>
  );
}