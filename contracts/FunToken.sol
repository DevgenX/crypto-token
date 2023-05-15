// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 < 0.9.0;

contract FunToken {
    string public name = "FunToken";
    string public symbol = "FUN";
    string public standard = "FunToken v.0.1";
    uint256 public totalSupply;
    uint256 public _userId;

    address public ownerOfContract; 

    address[] public holderToken;

    // event on transfer containing address of sender and receiver
    event Transfer (
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    
    // event on transfer to be sent by another address
    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // maps the info of address
    mapping(address => TokenHolderInfo) public tokenHolderInfos;
    // tracks the address's number of tokens
    mapping(address => mapping(address => uint256)) public allowance;

    mapping(address => uint256) public balanceOf;

    struct TokenHolderInfo {
        uint256 _tokenId;
        address _from;
        address _to;
        uint256 _totalToken;
        bool _tokenHolder;
    }



    constructor (uint256 _initialSupply) {
        ownerOfContract = msg.sender;
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // increase 1 number to id, to track it
    function inc() internal {
        _userId++;
    }

    // transfer the token to the address and uint256 as the value
    function transfer(address _to, uint256 _value) public returns(bool success){
        // must be greater than his balance
        require(balanceOf[msg.sender] >= _value);
        inc();

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        // update the information based on the event
        TokenHolderInfo storage tokenHolderInfo = tokenHolderInfos[_to];


        // update the struct, struct is like an object
        tokenHolderInfo._to = _to;
        tokenHolderInfo._from = msg.sender;
        tokenHolderInfo._totalToken = _value;
        tokenHolderInfo._tokenHolder = true;
        tokenHolderInfo._tokenId = _userId;
        
        holderToken.push(_to);

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    // approve spending on behalf of users
    function approve(address _spender, uint256 _value) public returns(bool success) {
        // assigning the address of the spender as the key, while the value is the value or amount
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }
    
    //transfer tokens only on behalf of addresses who are passed-in
    // from is owner of the tokens, sent into _to and value is amount
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
        // update the balances of each address who did the event
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        // update the balance of the sender, update the key value pair
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;

    }
    // returns the whole data passed-in address
    function getTokenHolderData(address _address) public view returns(uint256, address, address, uint256, bool) {
        return (
            tokenHolderInfos[_address]._tokenId, tokenHolderInfos[_address]._from, tokenHolderInfos[_address]._to, tokenHolderInfos[_address]._totalToken, tokenHolderInfos[_address]._tokenHolder
        );
    }

    // take the reference of the data in the smart contract, to save gas
    function getTokenHolder() public view returns(address[] memory) {
        return holderToken;
    }

}