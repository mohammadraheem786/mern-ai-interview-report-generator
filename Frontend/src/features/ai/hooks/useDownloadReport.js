import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

const useDownloadReport = () => {

    const [downloading, setDownloading] = useState(false);

    const downloadReport = async () => {

        try {

            setDownloading(true);

            const element = document.getElementById("report-content");

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#020617", // slate-950
            });

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = pdfWidth / imgWidth;
            const totalHeight = imgHeight * ratio;

            let yOffset = 0;

            // ─────────────────────────────
            // Handle Multi Page
            // ─────────────────────────────
            while (yOffset < totalHeight) {

                if (yOffset > 0) pdf.addPage();

                pdf.addImage(
                    imgData,
                    "PNG",
                    0,
                    -yOffset,
                    pdfWidth,
                    totalHeight
                );

                yOffset += pdfHeight;
            }

            pdf.save("interview-report.pdf");

        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to download report");
        } finally {
            setDownloading(false);
        }

    };

    return { downloadReport, downloading };

};

export default useDownloadReport;