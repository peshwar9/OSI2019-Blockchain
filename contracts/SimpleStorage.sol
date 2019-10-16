pragma solidity >=0.4.0 <0.7.0;

contract SimpleStorage {
    
    struct AttendanceCert   {
        string attendeeName;
        string conferenceName;
        string conferenceDetails;
        string issuedBy;
    }

    mapping(uint => AttendanceCert) attendees;

    function issueCert(uint phone, string memory _name, string memory _conf, string memory _details, string memory _issuedBy) public {
        attendees[phone] = AttendanceCert(_name, _conf, _details, _issuedBy);
    }
    
    function verifyCert(uint _phone) public view returns(string memory name, string memory conf, string memory details, string memory issuedBy) {
        return (attendees[_phone].attendeeName, attendees[_phone].conferenceName,attendees[_phone].conferenceDetails,attendees[_phone].issuedBy);
    }
    function getAttendeeName(uint _phone) public view returns(string memory name) {
      return attendees[_phone].attendeeName;
    }
}
