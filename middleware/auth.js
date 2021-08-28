export default async function ({
  route, redirect, $cookies
}) {
  const { path } = route
  if (path.startsWith('/inicioAdmin')) {
    if (!$cookies.get('ROLE_ADMIN')) {
      redirect('/login')
      
    }
  } else if (path.startsWith('/principalEst')) {
    if (!$cookies.get('ROLE_USER')) {
      redirect('/login')
    }
  } else if(path.startsWith('/inicioCont')){
  if (!$cookies.get('ROLE_HC')) {
    redirect('/login')

  }
 

  }


}