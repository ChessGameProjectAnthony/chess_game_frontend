export enum MatchEvents {
    MakeMove = "MakeMove",
    MoveMade = "MoveMade",

    OfferDraw = "OfferDraw",
    AcceptDraw = "AcceptDraw",
    DrawAccepted = "DrawAccepted",
    DrawDenied = "DrawDenied",

    GiveUp = "GiveUp",

    MatchEnded = "MatchEnded",

    Check = "Check",
    CheckMate = "CheckMate",

    OponnetExited = "OponnetExited",

    MoveMadeAndPieceCaptured = "MoveMadeAndPieceCaptured",
    GetMatchData = "GetMatchData"
}