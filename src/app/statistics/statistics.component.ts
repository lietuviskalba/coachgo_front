import { Component, OnInit, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { ChartService } from '../chart.service';
import * as _ from 'lodash';
import { AthleteService } from '../services/athlete.service';
import { Athlete } from '../entities/athlete';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  constructor(private athleteService: AthleteService, private trainingService: TrainingService) { }
  objectKeys = Object.keys;
  athletes: Athlete[] = [];
  athleteId;
  trainingai ;
  specificTraining;
  trainingtype;
  dataTodisplay = 'mpg';
  trainingsToShow;
  
  defaultTrainingai = [{ '_id': '123', 'trainingdate': '1970-01-01T01:00:00.000Z', training: 'basketball' }];
  something = 'vidas';
  BasketballTypes = {
    'mpg': 'Minutes per game',
    'fg': 'Field goals',
    'threep': 'Three points',
    'ft': 'Free throws',
    'ppg': 'Points per game',
    'rpg': 'Rebounds per game',
    'apg': 'Assists per game',
    'bpg': 'Blocks per game'
  };
  Footballtypes = {
    'mins': 'Football',
    'goals': 'Total goals',
    'assists': 'Total assists',
    'yel': 'Yellow card',
    'red': 'Red cards',
    'spg': 'Shots per training',
    'aerialswon': 'AerialsWon',
    'motm': 'Man of the match',

  };
  FitnessTypes = {
    'squats': 'Squats',
    'pull': 'Pull-ups',
    'push': 'Squats',
    'Push': 'Push-up',

  };
  default = { default : 'nothing to display'};

  datatypes: any = { 'Please select the date': 'Please select the date' };
  x = ["2013-10-04 22:23:00", "2013-11-04 22:23:00", "2013-12-04 22:23:00"];
  y = [1, 3, 6];

  public graph = {
    data: [{
      x: this.x,
      y: this.y,
      type: 'scatter'
    }],
  };
 
  getAthletes(): void {
    this.athleteService.getAthletes()
      .subscribe(athletes => this.athletes.push(...athletes));
  }



  ngOnInit() {
    this.getAthletes();

  }


  test() {
    // console.log(this.trainingai.find(smth => smth._id === this.specificTraining));
    console.log(this.graph.data);
  }
  updategraph() {
    console.log('updating shiet');
    // this.x = ["2014-10-04 22:23:00", "2018-11-04 22:23:00", "2017-12-04 22:23:00"];
    // this.y = [50, 55, 888];
    this.graph = {
      data: [{
        x: ["2014-10-04 22:23:00", "2018-11-04 22:23:00", "2017-12-04 22:23:00"],
        y: [50, 55, 888],
        type: 'scatter'
      }],
    };
  }

  setDatatypes(training) {
    console.log('setting up the shiet', training);
    if (training === 'basketball') {
      this.datatypes = this.BasketballTypes;
    } else if (training === 'football') {
      this.datatypes = this.FitnessTypes;
    } else if (training === 'fitness') {
      this.datatypes = this.FitnessTypes;
    } else {
      this.datatypes = { 'unavailable': 'unavailable' };
    }
    this.trainingsToShow = this.trainingai.filter(smth => smth.training === this.trainingtype);
  }


  onChange(deviceValue) {
    this.trainingai = this.athletes.find(smth => smth._id === this.athleteId).trainings;
// also reset othet two bastards
    this.datatypes = this.default;
  }
  onChange2(deviceValue) {
    // this.trainingtype = this.trainingai.find(smth => smth.training === this.specificTraining).training;
    this.setDatatypes(this.trainingtype);
    
  }
  onChange3(deviceValue) {
    // this.trainingsToShow = this.trainingai.filter(smth => smth.training === this.trainingtype);
    console.log(_.map(this.trainingsToShow, 'mpg'));
    this.graph = {
      data: [{
        x: this.trainingsToShow.map(a => a.trainingdate),
        y: _.map(this.trainingsToShow, 'mpg'),
        type: 'scatter'
      }],
    };
  
  }

}
