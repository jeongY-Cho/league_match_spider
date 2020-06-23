export interface FeaturedMatchResponse {
  gameList: GameList[];
  clientRefreshInterval: number;
}

export interface GameList {
  gameID: number;
  mapID: number;
  gameMode: string;
  gameType: string;
  gameQueueConfigID: number;
  participants: Participant[];
  observers: Observers;
  platformID: string;
  bannedChampions: BannedChampion[];
  gameStartTime: number;
  gameLength: number;
}

export interface BannedChampion {
  championID: number;
  teamID: number;
  pickTurn: number;
}

export interface Observers {
  encryptionKey: string;
}

export interface Participant {
  teamID: number;
  spell1ID: number;
  spell2ID: number;
  championID: number;
  profileIconID: number;
  summonerName: string;
  bot: boolean;
}
