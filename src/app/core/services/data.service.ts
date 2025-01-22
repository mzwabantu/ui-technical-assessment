import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Dataset } from "../models/dataset";
import { Stats } from "../models/stats";
import { Profile } from "../models/profile";
import { Connection } from "../models/connection";
import { Activity } from "../models/activity";
import { Notification } from "../models/notification";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An unknown error occurred!";

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error("Error:", errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Fetch Datasets
  getDatasets(): Observable<Dataset[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/datasets`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Fetch Stats
  getStats(): Observable<Stats[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/stats`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Fetch Profile
  getProfile(): Observable<Profile> {
    return this.http
      .get<any>(`${this.baseUrl}/profile`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Fetch Connections
  getConnections(): Observable<Connection[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/connections`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Fetch Activity
  getActivity(): Observable<Activity[]> {
    return this.http
      .get<Activity[]>(`${this.baseUrl}/activity`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Update Activity
  addActivity(updatedData: Activity): Observable<Activity[]> {
    return this.http.post(`${this.baseUrl}/activity`, updatedData).pipe(
      switchMap(() => this.getActivity()),
      catchError((error) => this.handleError(error)),
    );
  }

  //Get Notifications
  getNotifications(): Observable<Notification[]> {
    return this.http
      .get<Notification[]>(`${this.baseUrl}/notifications`)
      .pipe(catchError((error) => this.handleError(error)));
  }
}
