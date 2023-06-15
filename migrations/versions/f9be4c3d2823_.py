"""empty message

Revision ID: f9be4c3d2823
Revises: 1fa15dc11482
Create Date: 2023-06-11 15:51:11.823416

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9be4c3d2823'
down_revision = '1fa15dc11482'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('adoption', schema=None) as batch_op:
        batch_op.add_column(sa.Column('asociacion_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'asociacion', ['asociacion_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('adoption', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('asociacion_id')

    # ### end Alembic commands ###
