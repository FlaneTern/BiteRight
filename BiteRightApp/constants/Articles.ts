export interface ArticleParams {
  id: number;
  image: any;
  title: string;
  text: ({
    type: string;
    content: string;
  } | {
    type: string;
    content: string[];
  })[];
}

export const Articles = [
  {
    id: 1,
    image: require("@/assets/images/Article-1.png"),
    title: "Rahasia Diet Keto: Cara Cepat Turunkan Berat Badan",
    text: [
      {
        type: "paragraph",
        content: "Pernah mendengar tentang diet keto? Diet ini sedang menjadi tren karena klaimnya yang mampu membantu menurunkan berat badan dengan cepat sekaligus memberikan energi maksimal. Tapi apa sebenarnya diet keto itu? Dan bagaimana cara kerjanya? Yuk, simak rahasia diet keto yang akan mengubah hidupmu ini!\n",
      },
      {
        type: "paragraph",
        content: "Diet keto adalah pola makan rendah karbohidrat dan tinggi lemak. Prinsip utama dari diet ini adalah memaksa tubuh untuk membakar lemak sebagai sumber energi utama, bukan karbohidrat. Ini dicapai dengan mengurangi asupan karbohidrat hingga minimal, sehingga tubuh memasuki kondisi yang disebut ketosis.\n"
      },
      {
        type: "section",
        content: "Manfaat Diet Keto:",
      },
      {
        type: "list",
        content: [
          "Penurunan Berat Badan Cepat: Dengan mengurangi karbohidrat, tubuh akan membakar lemak dengan lebih efisien.",
          "Energi yang Stabil: Banyak yang melaporkan merasa lebih berenergi dan tidak mudah lelah saat menjalani diet keto.",
          "Kontrol Gula Darah: Diet ini juga membantu mengontrol gula darah, yang sangat baik bagi penderita diabetes tipe 2.\n",
        ],
      },
      {
        type: "section",
        content: "Makanan yang Harus Dikonsumsi:",
      },
      {
        type: "list",
        content: [
          "Lemak Sehat: Alpukat, minyak zaitun, dan kacang-kacangan.",
          "Protein: Daging, ikan, telur, dan produk susu tinggi lemak.",
          "Sayuran Rendah Karbohidrat: Bayam, brokoli, dan kembang kol.\n"
        ]
      },
      {
        type: "section",
        content: "Makanan yang Harus Dihindari:",
      },
      {
        type: "list",
        content: [
          "Karbohidrat Tinggi: Roti, pasta, nasi, dan makanan manis.",
          "Buah-buahan Tinggi Gula: Buah beri dalam jumlah sedikit masih diperbolehkan, tapi hindari buah tinggi gula seperti pisang dan mangga.\n"
        ]
      },
      {
        type: "paragraph",
        content: "Apakah diet keto cocok untukmu? Sebelum memulai, penting untuk berkonsultasi dengan ahli gizi atau dokter. Diet ini bisa sangat efektif untuk menurunkan berat badan dan meningkatkan energi, tapi juga harus dijalani dengan benar untuk menghindari efek samping. Mulailah diet keto sekarang dan rasakan manfaatnya!"
      }
    ],
  },
  {
    id: 2,
    image: require("@/assets/images/Article-2.png"),
    title: "Pahami Pentingnya Gizi Seimbang",
    text: [
      {
        type: "paragraph",
        content: "Apakah kamu merasa mudah lelah atau sering sakit? Mungkin masalahnya terletak pada pola makanmu. Gizi seimbang adalah kunci untuk hidup sehat dan bertenaga. Tapi apa sebenarnya yang dimaksud dengan gizi seimbang? Dan bagaimana cara mencapainya? Simak penjelasan berikut untuk mengubah hidupmu menjadi lebih baik!\n"
      },
      {
        type: "paragraph",
        content: "Gizi seimbang adalah pola makan yang mengandung semua nutrisi yang dibutuhkan oleh tubuh dalam jumlah yang tepat. Ini berarti kamu perlu mengonsumsi karbohidrat, protein, lemak, vitamin, dan mineral dalam proporsi yang seimbang. Mengikuti prinsip gizi seimbang membantu memastikan tubuhmu mendapatkan semua nutrisi yang dibutuhkan untuk berfungsi optimal.\n"
      },
      {
        type: "section",
        content: "Komponen Gizi Seimbang:"
      },
      {
        type: "list",
        content: [
          "Karbohidrat: Sumber energi utama untuk tubuh. Pilih karbohidrat kompleks seperti nasi merah, roti gandum, dan kentang.",
          "Protein: Penting untuk pertumbuhan dan perbaikan jaringan. Sumber protein yang baik termasuk daging, ikan, telur, dan kacang-kacangan.",
          "Lemak: Diperlukan untuk menyerap vitamin dan menjaga fungsi sel. Pilih lemak sehat seperti minyak zaitun, alpukat, dan kacang-kacangan.",
          "Vitamin dan Mineral: Diperlukan untuk berbagai fungsi tubuh. Buah-buahan dan sayuran adalah sumber utama vitamin dan mineral.",
          "Air: Penting untuk semua proses tubuh. Pastikan kamu minum cukup air setiap hari.\n"
        ]
      },
      {
        type: "section",
        content: "Tips Mencapai Gizi Seimbang:"
      },
      {
        type: "list",
        content: [
          "Makan Beragam Makanan: Jangan hanya mengandalkan satu jenis makanan. Makanlah berbagai jenis makanan untuk memastikan kamu mendapatkan semua nutrisi yang diperlukan.",
          "Porsi yang Tepat: Perhatikan porsi makanmu. Jangan makan berlebihan, tapi pastikan kamu juga tidak kekurangan nutrisi.",
          "Kurangi Gula dan Garam: Terlalu banyak gula dan garam dapat berdampak buruk bagi kesehatan. Cobalah untuk mengurangi konsumsi makanan manis dan asin.",
          "Konsumsi Sayuran dan Buah: Usahakan untuk mengonsumsi setidaknya lima porsi sayuran dan buah setiap hari.",
          "Pilih Sumber Lemak Sehat: Hindari lemak jenuh dan trans, pilih lemak tak jenuh yang lebih sehat untuk jantung.\n"
        ]
      },
      {
        type: "section",
        content: "Contoh Menu Sehari dengan Gizi Seimbang:"
      },
      {
        type: "list",
        content: [
          "Sarapan: Oatmeal dengan potongan buah segar dan madu.",
          "Makan Siang: Nasi merah dengan ayam panggang, sayuran rebus, dan salad buah.",
          "Makan Malam: Ikan panggang dengan quinoa dan sayuran hijau.",
          "Camilan: Yogurt rendah lemak dengan kacang almond dan buah beri.\n"
        ]
      },
      {
        type: "paragraph",
        content: "Mencapai gizi seimbang mungkin terdengar sulit, tapi dengan sedikit usaha dan perencanaan, kamu bisa melakukannya. Mulailah dengan membuat perubahan kecil pada pola makanmu dan perhatikan perbedaannya terhadap kesehatanmu. Dengan gizi seimbang, kamu tidak hanya akan merasa lebih baik secara fisik, tapi juga lebih energik dan siap menghadapi tantangan sehari-hari. Yuk, mulai hidup sehat dengan gizi seimbang sekarang!"
      }
    ]
  }
]