import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideAngularModule } from 'lucide-angular';
import { CardComponent } from '../../../shared/components/card/card.component';
import { DetailInfoComponent } from '../../components/detail-info/detail-info.component';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { StepsComponent } from '../../components/steps/steps.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailTicketService } from '../../services/detail-ticket/detail-ticket.service';
import {
  IFeedbackTicket,
  ITicketDetail,
  ITrackStatus,
  TDataDetail,
} from '../../../shared/types/ticketReport';
import { EMPTY, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import moment from 'moment';
import 'moment/locale/id';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

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
    AsyncPipe,
    LoadingComponent,
  ],
  templateUrl: './detail-ticket.component.html',
  styleUrl: './detail-ticket.component.scss',
})
export class DetailTicketComponent implements OnInit {
  constructor(
    private detailService: DetailTicketService,
    private route: ActivatedRoute
  ) {}
  private token = Cookies.get('token');
  name: string = '';

  ticketDetailData: ITicketDetail = {} as ITicketDetail;
  trackStatusData: ITrackStatus = {} as ITrackStatus;
  feedbackData: IFeedbackTicket = {} as IFeedbackTicket;
  isLoading$: Observable<boolean> = EMPTY;

  data: TDataDetail[] = [];

  private ticketNumber = this.route.snapshot.params['ticketNum'];
  private ticketId = this.route.snapshot.queryParams['ticketId'];

  getDetailTicketData() {
    this.detailService.getDetailTicket(this.ticketNumber);
    this.detailService.getObsvData().subscribe((value) => {
      this.ticketDetailData = value;
      this.mappingData();
    });
  }

  getTrackStatusData() {
    this.detailService.getTrackStatusData(this.ticketId);
    this.detailService.getObsvTrackData().subscribe((value) => {
      this.trackStatusData = value;
    });
  }

  getFeedbackData() {
    this.detailService.getFeedback(this.ticketId);
    this.detailService.getObsvFeedbackData().subscribe((value) => {
      this.feedbackData = value;
    });
  }

  formatDate(date: string) {
    return moment(date).locale('id').format('DD MMMM YYYY');
  }

  mappingData() {
    if (this.ticketDetailData && this.ticketDetailData.result) {
      this.data = [
        {
          title: 'Informasi Pelapor',
          details: [
            {
              detailTitle: 'Nama',
              detailDesc: this.ticketDetailData.result.reporter_detail.nama,
            },
            {
              detailTitle: 'Nomor Rekening',
              detailDesc:
                this.ticketDetailData.result.reporter_detail.account_number,
            },
            {
              detailTitle: 'Alamat',
              detailDesc: this.ticketDetailData.result.reporter_detail.address,
            },
            {
              detailTitle: 'Nomor Handphone',
              detailDesc:
                this.ticketDetailData.result.reporter_detail.no_handphone,
            },
          ],
        },
        {
          title: 'Detail Laporan',
          details: [
            {
              detailTitle: 'Tanggal Transaksi',
              detailDesc: this.formatDate(
                this.ticketDetailData.result.report_detail.transaction_date
              ),
            },
            {
              detailTitle: 'Nominal',
              detailDesc: new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(this.ticketDetailData.result.report_detail.amount),
            },
            {
              detailTitle: 'Kategori Laporan',
              detailDesc: this.ticketDetailData.result.report_detail.category,
            },
            {
              detailTitle: 'Deskripsi Laporan',
              detailDesc:
                this.ticketDetailData.result.report_detail.description,
            },
            {
              detailTitle: 'Nomor Transaksi',
              detailDesc:
                this.ticketDetailData.result.report_detail.reference_num,
            },
          ],
        },
        {
          title: 'Status Pengaduan',
          details: [
            {
              detailTitle: 'Tanggal Pengaduan',
              detailDesc: this.formatDate(
                this.ticketDetailData.result.report_status_detail.report_date
              ),
            },
            {
              detailTitle: 'Nomor Tiket',
              detailDesc:
                this.ticketDetailData.result.report_status_detail.ticket_number,
            },
            {
              detailTitle: 'Nomor Referensi',
              detailDesc: !this.ticketDetailData.result.report_detail
                .reference_num
                ? '-'
                : this.ticketDetailData.result.report_detail.reference_num,
            },
            {
              detailTitle: 'Nomor Referensi Lanjutan',
              detailDesc: !this.ticketDetailData.result.report_detail
                .reference_num
                ? '-'
                : this.ticketDetailData.result.report_status_detail
                    .next_reference_num,
            },
            {
              detailTitle: 'Status Tiket',
              detailDesc:
                this.ticketDetailData.result.report_status_detail.status,
            },
            {
              detailTitle: 'PIC',
              detailDesc: this.ticketDetailData.result.report_status_detail.pic,
            },
          ],
        },
      ];
    }
  }

  ngOnInit(): void {
    this.getDetailTicketData();
    this.getTrackStatusData();
    this.getFeedbackData();
    this.isLoading$ = this.detailService.getObsvLoading();
    if (this.token) {
      this.name = jwtDecode<{ firstName: string }>(this.token).firstName;
    }
  }
}
