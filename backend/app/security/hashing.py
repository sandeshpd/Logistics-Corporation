from passlib.context import CryptContext

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Hash:
    """
    Password hashing and verification.
    """
    def encrypt_password(password:str):
        get_hashed_password = pwd_cxt.hash(password)
        return get_hashed_password
    
    def verify(plain_password, hashed_password):
        verify_password = pwd_cxt.verify(plain_password, hashed_password)
        return verify_password