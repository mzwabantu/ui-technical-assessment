import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Dataset } from "../models/dataset";

@Injectable({
  providedIn: "root",
})
export class DatasetService {
  private readonly apiUrl = "http://localhost:3000/datasets";

  constructor(private http: HttpClient) {}

  // Get all datasets from the api
  getDatasets(): Observable<Dataset[]> {
    return this.http.get<Dataset[]>(this.apiUrl);
  }
}
