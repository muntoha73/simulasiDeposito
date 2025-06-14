document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amount");

    // Format input uang saat diketik
    amountInput.addEventListener("input", function () {
        const rawValue = this.value.replace(/\D/g, "");
        const formatted = Number(rawValue).toLocaleString("id-ID");

        this.value = rawValue ? formatted : "";
    });

    document.getElementById("depositForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const amount = parseFloat(amountInput.value.replace(/\D/g, ""));
        const interestRate = parseFloat(document.getElementById("Eqr").value);
        const months = parseInt(document.getElementById("duration").value);

        if (isNaN(amount) ||
            isNaN(interestRate) ||
            isNaN(months)) {
            alert("Mohon masukkan nilai yang valid.");
            return;
        }

        const monthlyInterest = (interestRate / 100) / 12;
        const totalInterest = amount * monthlyInterest * months;

        const tax = totalInterest * 0.20; // Pajak 20%
        const netInterest = totalInterest - tax;

        const grossPerMonth = totalInterest / months;
        const netPerMonth = netInterest / months;

        const totalAmount = amount + netInterest;

        const result = document.getElementById("result");

        result.innerHTML = `
            <div class="result-line"><span>Total Bagi Hasil (Kotor):</span><span>Rp ${totalInterest.toLocaleString("id-ID")}</span></div>
            <div class="result-line"><span>Pajak 20%:</span><span>Rp ${tax.toLocaleString("id-ID")}</span></div>
            <div class="result-line"><span>Total Bagi Hasil (Setelah Pajak):</span><span>Rp ${netInterest.toLocaleString("id-ID")}</span></div>
            <div class="result-line"><span>Bagi Hasil per Bulan (Sebelum Pajak):</span><span>Rp ${grossPerMonth.toLocaleString("id-ID")}</span></div>
            <div class="result-line"><span>Bagi Hasil per Bulan (Setelah Pajak):</span><span>Rp ${netPerMonth.toLocaleString("id-ID")}</span></div>
            <div class="result-line"><span>Total Dana setelah ${months} bulan:</span><span>Rp ${totalAmount.toLocaleString("id-ID")}</span></div>
        `;
    });
});
