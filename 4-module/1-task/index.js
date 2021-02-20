function makeFriendsList(friends) {
  const list = document.createElement('ul');
  
  friends.forEach(friend => {
    list.insertAdjacentHTML('beforeend', `<li>${friend.firstName} ${friend.lastName} </li>`);
  });

  return list;
}
