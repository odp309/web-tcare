import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideAngularModule } from 'lucide-angular';
import { CardComponent } from '../../../shared/components/card/card.component';
import { DetailInfoComponent } from '../../components/detail-info/detail-info.component';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { StepsComponent } from '../../components/steps/steps.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-ticket',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LucideAngularModule,
    CardComponent,
    DetailInfoComponent,
    RatingsComponent,
    StepsComponent,
    RouterLink,
  ],
  templateUrl: './detail-ticket.component.html',
  styleUrl: './detail-ticket.component.scss',
})
export class DetailTicketComponent {
  data = [
    {
      title: 'Informasi Pelapor',
      details: [
        {
          detailTitle: 'Name',
          detailDesc: 'Fajru Ramadhan',
        },
        {
          detailTitle: 'Nomor Rekening',
          detailDesc: '156251625263',
        },
        {
          detailTitle: 'Alamat',
          detailDesc: 'Jalan Lada Nomor 07',
        },
        {
          detailTitle: 'Nomor Handphone',
          detailDesc: '0851526135263',
        },
      ],
    },
    {
      title: 'Detail Laporan',
      details: [
        {
          detailTitle: 'Tanggal Transaksi',
          detailDesc: '19 Mei 2024',
        },
        {
          detailTitle: 'Nominal',
          detailDesc: 'Rp 57.000,00',
        },
        {
          detailTitle: 'Kategori Laporan',
          detailDesc: 'Gagal Bayar',
        },
        {
          detailTitle: 'Deskripsi Laporan',
          detailDesc:
            'The sun set behind the mountains, casting hues of orange and pink across the sky, as the gentle breeze whispered through the trees, creating a sense of tranquility in the evening air.',
        },
        {
          detailTitle: 'Nomor Transaksi',
          detailDesc: 'ABC1726177272',
        },
      ],
    },
    {
      title: 'Status Pengaduan',
      details: [
        {
          detailTitle: 'Tanggal Pengaduan',
          detailDesc: '20 Mei 2024',
        },
        {
          detailTitle: 'Nomor Tiket',
          detailDesc: 'ABC8176263728',
        },
        {
          detailTitle: 'Nomor Referensi',
          detailDesc: 'CBA8162537173',
        },
        {
          detailTitle: 'Status Tiket',
          detailDesc: 'Dalam Proses',
        },
      ],
    },
  ];
}
